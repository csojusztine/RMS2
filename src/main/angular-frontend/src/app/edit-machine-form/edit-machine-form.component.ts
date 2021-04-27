import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Machine } from '../model/machine';
import { Work } from '../model/work';
import { MachineService } from '../service/machine.service';
import { WorkService } from '../service/work.service';

import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Contact } from '../model/contact';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-machine-form',
  templateUrl: './edit-machine-form.component.html',
  styleUrls: ['./edit-machine-form.component.css'],
  
})
export class EditMachineFormComponent implements OnInit {

  machine: Machine = new Machine();

  editForm: FormGroup;

  contactForm: FormGroup;
  
  allWorks: Work[];

  worksByMachine: Work[];

  selectedWork: Work = new Work();

  selectedWorks: Work[];


  loading: boolean = false;

  successfully : boolean;

  model = new Contact();

  

  constructor(private snackBar: MatSnackBar, private modalService: NgbModal, private workService: WorkService, private httpClient: HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private machineService: MachineService) { 
    this.editForm = this.fb.group( {
      id: [''],
      manufacturer: [''],
      type: [''],
      reparation_price: [''],
      description_of_failure: [''],
      status: [''],
      reparation_limit: [''],
      single_work_limit: [''],
      
    });
    this.contactForm = this.fb.group( {
      manufacturer: [''],
      type: [''],
      description: [''],
      price: [''],
      customers_email: [''],
      note: ['']
    })
    
    
  }

  config: MatSnackBarConfig = {
    duration: 7000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.successfully = false;
    this.getMachine(id);
    this.getAllWorks();
    this.getWorksbyMachine(id);   

  }

  getMachine(id: number) {
    this.machineService.getMachineById(id).subscribe( data=> {
      this.machine = data;
      console.log(data);
      this.openForedit(data);
    })
  }

 

  getWorksbyMachine(id: number) {
    this.machineService.loadWorksforMachine(id).subscribe(data => {
      this.worksByMachine = data;
      console.log(data);

    })
  }
 
 addWork(work : Work) {
    if(this.machine.single_work_limit < work.price || this.machine.reparation_limit < (this.machine.reparation_price + work.price)) {
      this.warn('Limit reached, ask for a permission!');
    } else {
      const url = 'http://localhost:8080/api/machines/' + this.machine.id + '/work';
      this.httpClient.post(url, work).pipe(catchError(this.handleError)).subscribe((results) => {
        this.successfully = true;
        //console.log(results);
        
      })
      this.getWorksbyMachine(this.machine.id);
      this.getMachine(this.machine.id);
      this.successfully = false;
    }
    
  }

  deleteWorkFromMachine(work: Work) {
    const url = 'http://localhost:8080/api/machines/' + this.machine.id + '/deleteWork';
    this.httpClient.put(url, work).subscribe((results) => {
      this.ngOnInit();
      this.success('Work deleted successfully!');
    })
  }




  onSubmit() {
    if((document.getElementById('toggleId') as HTMLInputElement).checked) {
      this.changeToDone();
      
    }
    const editUrl = 'http://localhost:8080/api/machines/' + this.machine.id;
    this.httpClient.put(editUrl, this.editForm.value)
      .subscribe((results) => {
        this.success('Machine updated!');
        this.ngOnInit();
      });
  }

  openForedit(machine: Machine) {
    this.editForm.patchValue( {
      id: machine.id,
      manufacturer: machine.manufacturer,
      type: machine.type,
      reparation_price: machine.reparation_price,
      description_of_failure: machine.description_of_failure,
      status: machine.status,
      reparation_limit: machine.reparation_limit,
      single_work_limit: machine.single_work_limit,
      
    });

  }

  getAllWorks() {
    this.loading = true;
    this.workService.findAllWorks().subscribe(data => {
      this.allWorks = data;
      this.allWorks.sort(function(a, b){
        if (a.description < b.description) //sort string ascending
          return -1;
        if (a.description > b.description)
          return 1;
      });  
      this.loading = false;    

    })
  }

  changeToDone() {
    const editUrl = 'http://localhost:8080/api/machines/' + this.machine.id + '/changeStatus';
    this.httpClient.delete(editUrl).subscribe(results => {
        this.ngOnInit();
    })
  }



  isDone() : boolean{
    if(this.machine.status.includes("DONE")) {
      return true;
    } return false;
  }

  openContact(targetModal, work: Work) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.model.manufacturer= this.machine.manufacturer;
      this.model.type = this.machine.type;
      this.model.description= work.description;
      this.model.price = work.price;
      this.model.customers_email = this.machine.customers_email;
      this.model.work = work;

    this.contactForm.patchValue( {
      manufacturer: this.machine.manufacturer,
      type: this.machine.type,
      description: work.description,
      price: work.price,
      customers_email: this.machine.customers_email, 
      note: ""
      
    });

  }

  
  onClose() {
    this.contactForm.reset();
    //this.initializeFormGroup();
    this.modalService.dismissAll();
  }




  handleError(error: HttpErrorResponse){
    console.log("nem tudja addolni");
    let errormessage = 'You cannot add this one more!'
    window.alert(errormessage);
    return throwError(error);
  }


  sendEmail() {
    const url = 'http://localhost:8080/api/contact';
    this.model.note = this.contactForm.value.note;
    this.httpClient.post(url, this.model).subscribe(res => {
      this.success('The email is successfully sent!');
      location.reload();
      
    }, err =>  {
      alert("An error has accoured while sending email");
    });
  }
  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }

  success(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '',this.config);
  }


}


