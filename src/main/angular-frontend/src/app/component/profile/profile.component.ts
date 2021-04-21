import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  editForm: FormGroup;

  loggedUser: any;

  constructor(private token: TokenStorageService, private fb: FormBuilder, private httpClient: HttpClient, private auth:AuthService) {
    this.editForm = this.fb.group( {
      name: [''],
      username: [''],
      email: ['']
    })  
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.loggedUser = this.auth.getLoggedUser();
    
    this.editForm.patchValue( {
      name: this.currentUser.name,
      username: this.currentUser.username,
      email: this.currentUser.email,
      
    });
    this.loggedUser = this.token.getUser();
    console.log(this.currentUser.email);
  }


  onSubmit() {
    const editUrl = 'http://localhost:8080/api/users/editUser/' + this.currentUser.id;
    this.httpClient.patch(editUrl, this.editForm.value)
      .subscribe((results) => {
        console.log(results);
        
      });
  }



}
