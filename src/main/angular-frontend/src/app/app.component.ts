import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RMS';

  private roles: string[];
  userId: number;
  isLoggedIn = false;
  username: string;
  form: any = {};
  isLoginFailed = false;
  errorMessage = '';

  showAdminBoard = false;
  showWorkerBoard = false;

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, private router:Router) { }


  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userId = user.id;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showWorkerBoard = this.roles.includes('ROLE_WORKER');

      this.username = user.username;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
  
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        window.location.href = '/profile';
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }


  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
