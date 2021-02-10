import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {User} from '../model/user';

export const AUTH_API = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = false;
  loggedUser: User = new User();

  constructor(private httpClient: HttpClient,
              private router: Router) {
    this.refreshAuthenticatedUser();
  }

  refreshAuthenticatedUser() {
    this.getAuthenticatedUser().subscribe(
      data => {
        this.loggedUser = data;
        this.authenticated = true;
        sessionStorage.setItem('exampleAppLoggedIn', 'true');
      },
      (error: HttpErrorResponse) => {
        console.log('User is not authenticated, error: ' + error.error.message);
        sessionStorage.clear();
        this.authenticated = false;
        this.loggedUser = new User();
        this.router.navigate(['/login'], {});
      }
    );
  }

  isUserLoggedIn(): boolean {
    return sessionStorage.getItem('exampleAppLoggedIn') === 'true' || this.authenticated;
  }

  getLoggedUser(): User {
    return this.loggedUser;
  }

  isUserInRole(role: string): boolean {
    return this.loggedUser != null && this.loggedUser.roles != null && this.loggedUser.roles.includes(role);
  }

  getAuthenticatedUser(): Observable<any> {
    const URL: string = AUTH_API + '/user-details';
    return this.httpClient.get(URL, {withCredentials: true});
  }

  login(username: string, password: string) {
    const URL: string = AUTH_API + '/login';
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.httpClient.post(URL,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded'),
        responseType: 'text',
        withCredentials: true
      }
    );
  }
}
