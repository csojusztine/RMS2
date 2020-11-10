import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person';



//export const person_url= 'http://localhost:8080/api/users';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ=', // admin/password
    //'Access-Control-Allow-Origin': 'http://localhost:4200',
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

  getPersonById(id: string) {
    const url = this.person_url + '/' + id;
    return this.httpClient.get<Person>(url);
  }

  save(person: Person) {
    return this.httpClient.post<Person>(this.person_url, person);
  }




}
