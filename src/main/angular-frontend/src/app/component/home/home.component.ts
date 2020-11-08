import { Component, OnInit } from '@angular/core';


import {PersonService} from "../../service/person.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private personService: PersonService) {
  }

  ngOnInit() {
  }

  /*getLoggedUserName(): string {
    const user = this.authService.getLoggedUser();
    if (user != null) {
      return user.username;
    } else {
      return '';
    }
  }

  getUserRoles() {
  return this.authService.loggedUser != null ? this.authService.loggedUser.roles : '';
  }*/

}
