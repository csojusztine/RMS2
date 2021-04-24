import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Work } from '../model/work';
import { WorkService } from '../service/work.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WorkFormComponent } from '../component/work-form/work-form.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class WorkListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  works: Work[];

  machinesOfTheWork: any;

  displayedColumns = ['id', 'description', 'price', 'edit', 'delete'];

  dataSource = new MatTableDataSource<Work>();



  form:FormGroup;

  

  constructor(private fb: FormBuilder, private modalService: NgbModal, private workForm: WorkFormComponent ,private workService: WorkService, private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) {
  
   }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  ngOnInit(): void {
    this.getAllWorks();   
    this.form = this.fb.group({
      id: [''],
      description: [''],
      price: [''],
      
    } );
    /*/this.form = new FormGroup({
      id:  new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
   }); */
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openEdit(targetModal, work: Work) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'medium'
    });
    this.form.patchValue( {
      id: work.id,
      description: work.description,
      price: work.price,


    });

  }

  onSave() {
    const editURL = 'http://localhost:8080/api/works/' + this.form.value.id;
    console.log(this.form.value);
    let msg ='Successfully modified!';
    this.http.put(editURL, this.form.value)
      .subscribe((results) => {
        this.success(msg);
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  onClear() {
    this.form.reset();
  }



  getAllWorks() {
    this.workService.findAllWorks().subscribe(data => {
      this.works = data;  
      this.dataSource.data = data;
      
    })

  }

  onClose() {
    this.form.reset();
    //this.initializeFormGroup();
    this.modalService.dismissAll();
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
    this.warn(errormessage);
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

  

  success(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '',this.config);
  }

  

  




  
 



}
