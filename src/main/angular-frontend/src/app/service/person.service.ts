import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person';


//export const person_url= 'http://localhost:8080/api/users';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    //'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ=', // admin/password
  })
};


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  person_url: string;

  constructor(private httpClient: HttpClient) { 
    this.person_url = 'http://localhost:8080/api/users';
  }


  public findAllPerson(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.person_url);
  }

/*
  getPersonList(): Observable<Person[]>{
    return this.httpClient.get<Person[]>(person_url, {withCredentials:true});
  }*/
}
