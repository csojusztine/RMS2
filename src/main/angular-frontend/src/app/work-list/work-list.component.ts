import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Work } from '../model/work';
import { WorkService } from '../service/work.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkFormComponent } from '../component/work-form/work-form.component';


@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})


export class WorkListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  works: Work[];

  machinesOfTheWork: any;

  displayedColumns = ['id', 'description', 'price', 'edit', 'delete'];

  dataSource = new MatTableDataSource<Work>();


  

  constructor(private workForm: WorkFormComponent ,private workService: WorkService, private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  ngOnInit(): void {
    this.getAllWorks();    
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  getAllWorks() {
    this.workService.findAllWorks().subscribe(data => {
      this.works = data;  
      this.dataSource.data = data;
      
    })

  }

  getMachinesOfTheWork(id: number) : boolean {
    const url = 'http://localhost:8080/api/works/' + id + '/machines';
    this.http.get(url).subscribe(data => {
      this.machinesOfTheWork = data;
      console.log(data);
    });
    if(this.machinesOfTheWork.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onDelete(id: number) {
    const deleteURL = 'http://localhost:8080/api/works/' + id;
    if(confirm('Are you sure to delete this record ?')){
      this.http.delete(deleteURL).pipe(catchError(this.handleError))
      .subscribe((results) => {
        this.warn('! Deleted successfully');
        this.ngOnInit();
        this.ngAfterViewInit();
      });     
      
    }
  }


  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }

  handleError(error: HttpErrorResponse){
    let errormessage = 'You cannot delete this work, because it is a property of a machine!';
    window.alert(errormessage);
    return throwError(errormessage);
  }


  onCreate() {
    this.workForm.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(WorkFormComponent,dialogConfig);
    this.ngOnInit();
    this.ngAfterViewInit();
  }



  
 



}
