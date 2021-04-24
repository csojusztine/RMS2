import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Work } from '../model/work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  work_url: string;

  editwork_url: string;

  constructor(private httpClient: HttpClient) { 
    this.work_url = 'http://localhost:8080/api/works';
    
  }


  
  public findAllWorks(): Observable<Work[]> {
    return this.httpClient.get<Work[]>(this.work_url);
  }

  public editWork(work: Work) {
    const url = 'http://localhost:8080/api/works' + work.id;
    return this.httpClient.put<Work>(url, work);
  }



}
