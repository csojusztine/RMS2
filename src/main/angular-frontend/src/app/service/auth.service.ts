import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from '../model/person';
import { User } from '../model/user';


export const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  loggedPerson: Person = new Person();

  loggedUser: User = new User();

  constructor(private http: HttpClient) {
    
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
    
  }

  getAuthenticatedUser(): Observable<any> {
    const url: string = AUTH_API + 'getLoggedUser';
    return this.http.get(url);
  }

  getLoggedUser(): Person {
    this.getAuthenticatedUser().subscribe(
      data => {
        this.loggedPerson = data;
        //console.log(data);
      }
    )
    return this.loggedPerson;
  }


/*
/*


  isUserInRole(role: string): boolean {
    return this.loggedUser != null && this.loggedUser.roles != null && this.loggedUser.roles.includes(role);
  }
S
  }*/
}
