import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Machine } from '../model/machine';
import { Person } from '../model/person';
import { MachineService } from '../service/machine.service';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.css']
})
export class MachineDetailComponent implements OnInit {
  machineService: MachineService;
  machine = new Machine();
  //personName: Person;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //const id = +this.route.snapshot.paramMap.get('id');
    //this.getUserForMachine(id);
  }



/*
  getUserForMachine(id: number) {
    this.machineService.loadUserForMAchine(id).subscribe(
      (data) => {
        console.log(data);
        this.machine.personName = data.name;
      }
    );
  }*/

}
