import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Machine } from '../model/machine';
import { MachineService } from '../service/machine.service';

@Component({
  selector: 'app-edit-machine-form',
  templateUrl: './edit-machine-form.component.html',
  styleUrls: ['./edit-machine-form.component.css']
})
export class EditMachineFormComponent implements OnInit {

  machine: Machine = new Machine();

  editForm: FormGroup;
  

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private machineService: MachineService) { 
    this.editForm = this.fb.group( {
      id: [''],
      manufacturer: [''],
      type: [''],
      reparation_price: [''],
      description_of_failure: [''],
      status: ['']

    })
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.getMachine(id);
    
  }

  getMachine(id: number) {
    this.machineService.getMachineById(id).subscribe( data=> {
      this.machine = data;
      this.openForedit(data);
      console.log(data);
    })

  }

  onSubmit() {
    const editUrl = 'http://localhost:8080/api/machines/' + this.machine.id;
    console.log(this.editForm.value);
    this.httpClient.put(editUrl, this.editForm.value)
      .subscribe((results) => {
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
      status: machine.status
    });

  }

  

}
