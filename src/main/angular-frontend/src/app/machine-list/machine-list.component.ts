import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Machine } from '../model/machine';
import { Person } from '../model/person';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { MachineService } from '../service/machine.service';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})

export class MachineListComponent implements OnInit {


  machines: Machine[];

  loggedUserId: number;

  loggedUser: User;

  sendIdUrl: string;
  success: boolean;


  machine: Machine;

  isAdded: boolean;


  closeResult: string;
  deleteId: any;

  constructor(private authService: AuthService, private personService: PersonService, private route: ActivatedRoute, private machineService: MachineService, private modalService: NgbModal, private httpClient: HttpClient) { 
    this.sendIdUrl = 'http://localhost:8080/sendIdentifier';
  }
  
  ngOnInit(): void {
    this.getMachines();
    this.loggedUserId = this.authService.getLoggedUser().id;
    this.loggedUser = this.authService.getLoggedUser();
    console.log(this.loggedUserId);
  }

  private getMachines() {
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
    })
  }

  openToAdd(targetModal, machine: Machine) {
    
    this.machine = machine;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }


  onSubmitaMachine() {   
      const url = 'http://localhost:8080/api/users/addMachine/' + this.loggedUserId;
      
      this.httpClient.post(url,this.machine).subscribe((result) => {
        console.log(result);
        this.ngOnInit();
      });
      this.modalService.dismissAll(); 
  }

  openDelete(targetModal, machine: Machine) {
    this.deleteId = machine.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/api/machines/delete/' + this.deleteId;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
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
    const url = 'http://localhost:8080/api/machines/addMachine';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });  
    this.modalService.dismissAll(); //dismiss the modal
  }


  isMachineAdded(machine: Machine) : boolean {
    if(machine.status === "UNDER_REPARATION" || machine.status === "DONE") {
      this.isAdded = true;
    } else {
      this.isAdded = false;
    }
    return this.isAdded;
  }

  loadUserforMachine(id: number) {
    this.machineService.loadUserForMAchine(id).subscribe( data => {
        const userName = data.name;
        return userName;
    })
    
  }

  isAdmin(): boolean {
    if(this.loggedUser.roles.includes('ROLE_ADMIN')) {
      return true;
    }
    return false;
  }

}
