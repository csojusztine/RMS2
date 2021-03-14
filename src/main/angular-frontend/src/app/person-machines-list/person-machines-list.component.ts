import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Machine } from '../model/machine';
import { AuthService } from '../service/auth.service';
import { PersonService } from '../service/person.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-person-machines-list',
  templateUrl: './person-machines-list.component.html',
  styleUrls: ['./person-machines-list.component.css']
})
export class PersonMachinesListComponent implements OnInit {

  loggedUserId: number;

  userMachines: Machine[];

  machine: Machine;


  constructor(private route: ActivatedRoute, private authService: AuthService, private personService: PersonService, private httpClient: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.getUserAllMachines(id);
    this.loggedUserId = this.authService.getLoggedUser().id;
  }

  private getUserAllMachines(id:number) {
    
    this.personService.getUserAllMachines(id).subscribe(
      data => {
        this.userMachines = data;
        console.log(data);
      }
    )
  }

  openDelete(targetModal, machine: Machine) {
    this.machine = machine;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/api/users/' + this.loggedUserId + '/machine';
    this.httpClient.put(deleteURL, this.machine)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }



}
