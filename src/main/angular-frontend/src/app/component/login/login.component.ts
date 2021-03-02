import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router, private tokenStorage: TokenStorageService) {}

    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

ngOnInit() {
  if (this.tokenStorage.getToken()) {
    this.isLoggedIn = true;
    this.roles = this.tokenStorage.getUser().roles;
  }
}

onSubmit() {
  this.authService.login(this.form).subscribe(
    data => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.reloadPage();
      this.router.navigate(['/profile'])
    },
    err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
  );
}

reloadPage() {
  window.location.reload();
  

}



/*login(form: NgForm) {
    const username : string = form.value.username;
    const password = form.value.password;
    this.authService.login(username, password).subscribe(
    () => {
      sessionStorage.setItem('exampleAppLoggedIn', 'true');
      this.authService.authenticated = true;
      this.authService.refreshAuthenticatedUser();
      this.router.navigate(['/home']);
    },
    error => {
      console.log('login failed, error: ' + error.error);
      alert("Login failed");
      this.authService.refreshAuthenticatedUser();
    }
    );
  }*/
  
}
