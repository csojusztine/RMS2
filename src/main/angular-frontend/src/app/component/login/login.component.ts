import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) {}

ngOnInit() {
}

login(form: NgForm) {
    const username = form.value.username;
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
  }
  
}
