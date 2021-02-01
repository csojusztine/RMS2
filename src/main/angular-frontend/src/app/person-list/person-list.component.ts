import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';
import {ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
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


  roles = ["ROLE_ADMIN", "ROLE_WORKER"]
  

  constructor(private personService: PersonService, private modalService: NgbModal, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getPersons();
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
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
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

}
