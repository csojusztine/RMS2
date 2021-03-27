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

  dropdownSettings: IDropdownSettings = {};
  selectedWorks: Work[];


  constructor(private workService: WorkService, private httpClient: HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private machineService: MachineService) { 
    this.getAllWorks();
    this.editForm = this.fb.group( {
      id: [''],
      manufacturer: [''],
      type: [''],
      reparation_price: [''],
      description_of_failure: [''],
      status: [''],
      works: [this.selectedWorks]


    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.getMachine(id);
    this.dropdownSettings = {
      singleSelection: false,
      allowSearchFilter: true,
      idField: 'id',
      textField: 'description',
      
    };
    
  }

  getMachine(id: number) {
    this.machineService.getMachineById(id).subscribe( data=> {
      this.machine = data;
      this.openForedit(data);
      //console.log(data);
    })

  }

  getWorksbyMachine(id: number) {
    this.machineService.loadWorksforMachine(id).subscribe(data => {
      this.worksByMachine = data;
      console.log(data);
    })
  }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }



  onSubmit() {
    const editUrl = 'http://localhost:8080/api/machines/' + this.machine.id;
    const url = editUrl + '/work';
    this.httpClient.post(url, this.selectedWorks).subscribe((results) => {
      //console.log(results);
      this.ngOnInit();
    })
     
    console.log(this.selectedWorks);
    this.httpClient.put(editUrl, this.editForm.value)
      .subscribe((results) => {
        
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
      works: machine.works
    });

  }

  getAllWorks() {
    this.workService.findAllWorks().subscribe (data => {
      this.allWorks = data;
      console.log(data);
    })
  }
  

}
