import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Machine } from '../model/machine';
import { MachineService } from '../service/machine.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {


  page = 1;
  pageSize = 4;
  
  statuses = ["UNDER_REPARATION", "DONE", "ON_WAITING_LIST", "RETURNED"];


  machines: Machine[];
  
  closeResult: string;

  constructor(private machineService: MachineService, private modalService: NgbModal, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getMachines();
    this.refreshMachines();
  }

  private getMachines() {
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
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
    const url = 'http://localhost:8080/api/machines/addMachine';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  refreshMachines() {
    this.getMachines();
    this.machines.map((machine, i) => ({id: i + 1, ...machine}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
