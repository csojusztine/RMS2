import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Machine } from '../model/machine';
import { Work } from '../model/work';
import { MachineService } from '../service/machine.service';
import { WorkService } from '../service/work.service';

@Component({
  selector: 'app-edit-machine-form',
  templateUrl: './edit-machine-form.component.html',
  styleUrls: ['./edit-machine-form.component.css']
})
export class EditMachineFormComponent implements OnInit {

  machine: Machine = new Machine();

  editForm: FormGroup;
  
  allWorks: Work[];

  worksByMachine: Work[];

  selectedWork: Work = new Work();

  selectedWorks: Work[];

  alert: boolean;

  done = false;
  
  theCheckbox = false;

  constructor(private workService: WorkService, private httpClient: HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private machineService: MachineService) { 
    this.editForm = this.fb.group( {
      id: [''],
      manufacturer: [''],
      type: [''],
      reparation_price: [''],
      description_of_failure: [''],
      status: [''],
      
    });
    this.getAllWorks();
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.getMachine(id);
    
    this.getWorksbyMachine(id);
    this.alert = false;
  }

  getMachine(id: number) {
    this.machineService.getMachineById(id).subscribe( data=> {
      this.machine = data;

      this.openForedit(data);
    })
    //const index: number = this.worksByMachine.indexOf(msg);
    
  }

 

  getWorksbyMachine(id: number) {
    this.machineService.loadWorksforMachine(id).subscribe(data => {
      this.worksByMachine = data;
      console.log(data);
    })
  }
 
 addWork(work : Work) {
    const url = 'http://localhost:8080/api/machines/' + this.machine.id + '/work';
    const index = this.allWorks.indexOf(work);
    console.log(index);
    this.httpClient.post(url, work).subscribe((results) => {
      this.alert = true;
      console.log(this.alert);
      this.allWorks.splice(index,1);
      console.log(this.allWorks);
      this.ngOnInit();

    })
  
  }

  deleteWorkFromMachine(work: Work) {
    const url = 'http://localhost:8080/api/machines/' + this.machine.id + '/deleteWork';
    this.httpClient.put(url, work).subscribe((results) => {
      this.allWorks.push(work);
      this.ngOnInit();
    })
  }




  onSubmit() {
    const editUrl = 'http://localhost:8080/api/machines/' + this.machine.id;

    this.httpClient.put(editUrl, this.editForm.value)
      .subscribe((results) => {
        console.log(results);
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
      
    });

  }

  getAllWorks() {
    this.workService.findAllWorks().subscribe (data => {
      this.allWorks = data;
      console.log(data);
    })
  }

  changeToDone(e) {
    const editUrl = 'http://localhost:8080/api/machines/' + this.machine.id + '/changeStatus';
    if(this.done) {
      e.preventDefault();
    } else {
      if(e.target.checked) {
      this.httpClient.put(editUrl, null).subscribe(data => {
        console.log(e.target.checked);
        this.ngOnInit();
      })
    }
    }
    
    
  }
  
  

}
