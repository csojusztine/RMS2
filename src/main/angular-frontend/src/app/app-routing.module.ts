import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';

import { MachineListComponent } from './machine-list/machine-list.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonMachinesListComponent } from './person-machines-list/person-machines-list.component';


const routes: Routes = [

  {
    path: '', redirectTo: '', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, pathMatch: 'full',
  },

  {
    path: 'persons', component: PersonListComponent,
  },
  
  
  {
    path: 'login', component: LoginComponent,
  },

  {
    path: 'profile', component: ProfileComponent,
  },
  {
    path: 'machines', component: MachineListComponent,
  },
  {
    path: 'persons/:id/machines', component: PersonMachinesListComponent 
  },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
