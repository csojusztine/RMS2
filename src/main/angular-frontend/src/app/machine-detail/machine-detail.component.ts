import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Machine } from '../model/machine';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.css']
})
export class MachineDetailComponent implements OnInit {
  machineService: any;
  machine = new Machine();
  personName: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getMachineById(id);
  }


  getMachineById(id){
    
    this.machineService.getMachineById(id).subscribe(
      data => {
        this.machine = data;
        this.getUserForMachine();
      }
    );
  }

  getUserForMachine() {
    this.machineService.loadUserForMAchine(this.machine.id).subscribe(
      (data) => {
        console.log(data);
        this.personName = data.name;
      }
    );
  }

}
