import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Work } from '../model/work';
import { WorkService } from '../service/work.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})


export class WorkListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  works: Work[];

  displayedColumns = ['id', 'description', 'price', 'edit', 'delete'];

  dataSource = new MatTableDataSource<Work>();
  

  constructor(private workService: WorkService, private http: HttpClient, private snackBar: MatSnackBar) { }

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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onDelete(id: number) {
    const deleteURL = 'http://localhost:8080/api/works/' + id;
    if(confirm('Are you sure to delete this record ?')){
      this.http.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.ngAfterViewInit();
      });
      this.warn('! Deleted successfully');
    } 
    
  }


  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }

}
