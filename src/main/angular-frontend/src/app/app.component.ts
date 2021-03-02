import { Component } from '@angular/core';
import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RMS';

  private roles: string[];
  isLoggedIn = false;
  username: string;

  showAdminBoard = false;
  showWorkerBoard = false;

  constructor(private tokenStorageService: TokenStorageService) { }


  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showWorkerBoard = this.roles.includes('ROLE_WORKER');

      this.username = user.username;
    }
  }


  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
