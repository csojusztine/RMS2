import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  authenticated = false;
  loggedUser: User = new User();

  constructor(private http: HttpClient,
              private router: Router) {
    
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }


/*
  isUserLoggedIn(): boolean {
    return sessionStorage.getItem('exampleAppLoggedIn') === 'true' || this.authenticated;
  }

  getLoggedUser(): User {
    return this.loggedUser;
  }

  isUserInRole(role: string): boolean {
    return this.loggedUser != null && this.loggedUser.roles != null && this.loggedUser.roles.includes(role);
  }
S
  }*/
}
