import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine } from '../model/machine';
import { Person } from '../model/person';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';



//export const person_url= 'http://localhost:8080/api/users';




@Injectable({
  providedIn: 'root'
})
export class PersonService {

  person_url: string;

  loggedUserId: number;

  constructor(private httpClient: HttpClient, private auth: AuthService) { 
    this.person_url = 'http://localhost:8080/api/users';
    this.loggedUserId = this.auth.getLoggedUser().id;
  }


  public findAllPerson(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.person_url);
  }


  getPersonById(id: string) {
    const url = this.person_url + '/' + id;
    return this.httpClient.get<Person>(url);
  }


  getUserAllMachines(id:number) {
    const url = this.person_url + '/' + id + '/machines';
    return this.httpClient.get<Machine[]>(url);
  }





}
