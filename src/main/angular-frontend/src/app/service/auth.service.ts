import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from '../model/person';
import { User } from '../model/user';
import { TokenStorageService } from './token-storage.service';


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

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
    
  }


  getLoggedUser(): User {
    const user = this.tokenStorageService.getUser();
    this.loggedUser = user;
    return this.loggedUser;
  }

/*
/*


  isUserInRole(role: string): boolean {
    return this.loggedUser != null && this.loggedUser.roles != null && this.loggedUser.roles.includes(role);
  }
S
  }*/
}
