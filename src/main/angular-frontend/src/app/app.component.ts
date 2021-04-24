import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Machine } from './model/machine';
import { Work } from './model/work';
import { AuthService } from './service/auth.service';
import { MachineService } from './service/machine.service';
import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RMS';

  private roles: string[];
  userId: number;
  isLoggedIn = false;
  username: string;
  form: any = {};
  isLoginFailed = false;
  errorMessage = '';


  detailForm: FormGroup;
  machine: Machine;

  worksByMachine: Work[];

  showAdminBoard = false;
  showWorkerBoard = false;

  constructor(private fb: FormBuilder,private modalService: NgbModal, private machineService: MachineService, private authService: AuthService, private tokenStorageService: TokenStorageService, private router:Router) { 
    this.detailForm = this.fb.group( {
      id: [''],
      manufacturer: [''],
      type: [''],
      reparation_price: [''],
      description_of_failure: [''],
      status: [''],
      arriving_date: [''],
      work: ['']
    });
  }


  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userId = user.id;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showWorkerBoard = this.roles.includes('ROLE_WORKER');

      this.username = user.username;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
  
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        window.location.href = '/profile';
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  onCheck(targetModal, id: number) {
    this.machineService.getMachineByIdentifier(id).subscribe((data => {
      this.machine = data;
      console.log(data);
      this.openForDetails(targetModal, this.machine);
    }))
  }

  openForDetails(targetModal, machine: Machine){
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.getWorksbyMachine(machine.id);
    
    this.detailForm.patchValue( {
      id: machine.id,
      manufacturer: machine.manufacturer,
      type: machine.type,
      reparation_price: machine.reparation_price,
      description_of_failure: machine.description_of_failure,
      status: machine.status,
      arriving_date: machine.arriving_date,
      work: machine.works
      
      
    });

  }

  getWorksbyMachine(id: number) {
    this.machineService.loadWorksforMachine(id).subscribe(data => {
      this.worksByMachine = data;
      console.log(data);
      
    })
  }

  onClose() {
    this.detailForm.reset();
    //this.initializeFormGroup();
    this.modalService.dismissAll();
  }


  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
