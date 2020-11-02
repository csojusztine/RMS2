import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person';


//export const  = 'http://192.168.0.52:8080/users';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  person_url: string;

  constructor(private httpClient: HttpClient) { 
    this.person_url = 'http://localhost:8080/users';
  }


  findAllPerson(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.person_url);
  }


  /*getPersonList(): Observable<Person[]>{
    return this.httpClient.get<Person[]>(person_url, {withCredentials:true});
  }*/
}
