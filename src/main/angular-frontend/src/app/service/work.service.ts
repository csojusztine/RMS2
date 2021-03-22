import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Work } from '../model/work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  work_url: string;

  constructor(private httpClient: HttpClient) { 
    this.work_url = 'http://localhost:8080/api/works';
  }


  
  public findAllWorks(): Observable<Work[]> {
    return this.httpClient.get<Work[]>(this.work_url);
  }



}
