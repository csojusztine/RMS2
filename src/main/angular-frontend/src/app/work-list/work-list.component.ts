import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Work } from '../model/work';
import { WorkService } from '../service/work.service';


@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})


export class WorkListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  works: Work[];

  displayedColumns = ['id', 'description', 'price'];

  dataSource = new MatTableDataSource<Work>();
  

  constructor(private workService: WorkService, private http: HttpClient) { }

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


}
