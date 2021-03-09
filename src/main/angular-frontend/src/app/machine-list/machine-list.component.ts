import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from '../component/profile/profile.component';
import { MachineDetailComponent } from '../machine-detail/machine-detail.component';
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

  page = 1;
  pageS = 4;
  collectionSize: number;
  currentRate = 8;
  searchTerm: string;
  
  statuses = ["UNDER_REPARATION", "DONE", "ON_WAITING_LIST", "RETURNED"];

  machines: Machine[];

  machine = new Machine();

  loggedUserId: number;


  personName : string;
  
  closeResult: string;

  constructor(private authService: AuthService, private personService: PersonService, private route: ActivatedRoute, private machineService: MachineService, private modalService: NgbModal, private httpClient: HttpClient) { }
  
  ngOnInit(): void {
    this.getMachines();
  }

  private getMachines() {
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
    })
  }

  openToAdd(targetModal, machine: Machine) {

    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }


  onSubmitaMachine(machine: Machine) {
      this.loggedUserId = this.authService.getLoggedUser().id;
      const url = 'http://localhost:8080/api/users/' + this.loggedUserId + '/addMachine';
      this.httpClient.post(url,machine).subscribe((result) => {
        this.ngOnInit();
      });
      this.modalService.dismissAll(); 
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



}
