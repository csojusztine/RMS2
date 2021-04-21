import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';
import {ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: Person[];
  
  closeResult: string;

  deleteId : number;

  editForm: FormGroup;

  constructor(private personService: PersonService, private modalService: NgbModal, private httpClient: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getPersons();
    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      e_mail: [''],
      phone_number: ['']
    } );
  }

  private getPersons() {
    this.personService.findAllPerson().subscribe(data => {
      this.persons = data;
      
    })
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/api/users/addUser';
    if(f.valid) {
      this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
    }
    
  }

  openDetails(targetModal, person: Person) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('_name').setAttribute('value', person.name);
    document.getElementById('_username').setAttribute('value', person.username);
    document.getElementById('_e_mail').setAttribute('value', person.e_mail);
    document.getElementById('_phone_number').setAttribute('value', person.phone_number);
  }
 
 openDelete(targetModal, person: Person) {
    this.deleteId = person.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/api/users/delete/' + this.deleteId;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openEdit(targetModal, person: Person) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: person.id,
      name: person.name,
      username: person.username,
      e_mail: person.e_mail,
      phone_number: person.phone_number,

    });

  }


  onSave() {
    const editURL = 'http://localhost:8080/api/users/editUser/' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
}
