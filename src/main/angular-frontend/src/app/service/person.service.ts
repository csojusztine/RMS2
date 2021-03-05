import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person';
import { TokenStorageService } from './token-storage.service';



//export const person_url= 'http://localhost:8080/api/users';




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
//emiatt kell az a paramroute szar !!!
  getPersonById(id: string) {
    const url = this.person_url + '/' + id;
    return this.httpClient.get<Person>(url);
  }

  save(person: Person) {
    return this.httpClient.post<Person>(this.person_url, person);
  }




}
