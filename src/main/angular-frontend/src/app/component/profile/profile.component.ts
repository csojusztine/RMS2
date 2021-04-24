import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Person } from '../../model/person';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';
import { PersonService } from '../../service/person.service';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  editForm: FormGroup;
  loggedUser: Person = new Person();

 
  constructor(private token: TokenStorageService, private fb: FormBuilder, private httpClient: HttpClient, private personS: PersonService) {
    
      this.editForm = this.fb.group( {
      name: [''],
      username: [''],
      e_mail: ['']
    })  
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.getUserById(this.currentUser.id);
    this.editForm.patchValue( {
      name: this.currentUser.name,
      username: this.currentUser.username,
      e_mail: this.currentUser.email,
      
    });
    this.patchForm();

    
    //console.log(this.loggedUser);
  }


  onSubmit() {
    const editUrl = 'http://localhost:8080/api/users/' + this.loggedUser.id;
    this.httpClient.put(editUrl, this.editForm.value)
      .subscribe((results) => {
        this.currentUser = results;
        console.log(results);
        this.patchForm();
        
      });
  }

  getUserById(id: number) {
    this.personS.getPersonById(id).subscribe((data) => {
      this.loggedUser = data;
      console.log(data);
    })
  }

  patchForm() {
    this.editForm.patchValue( {
      name: this.loggedUser.name,
      username: this.loggedUser.username,
        e_mail: this.loggedUser.e_mail,
      
    });
  
  }



}
