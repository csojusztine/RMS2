import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  //currentUserId: number;

  userMachines: Machine[];

  constructor(private route: ActivatedRoute, private authService: AuthService, private personService: PersonService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.getUserAllMachines(id);
    
    
  }

  private getUserAllMachines(id:number) {
    
    this.personService.getUserAllMachines(id).subscribe(
      data => {
        this.userMachines = data;
        console.log(data);
      }
    )
  }


}
