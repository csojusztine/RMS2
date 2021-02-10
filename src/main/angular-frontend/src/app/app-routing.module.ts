import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { MachineListComponent } from './machine-list/machine-list.component';
import { PersonListComponent } from './person-list/person-list.component';
import { LoggedInGuardService } from './service/logged-in-guard.service';

const routes: Routes = [

  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [LoggedInGuardService]
  },

  {
    path: 'persons', component: PersonListComponent, canActivate: [LoggedInGuardService]
  },
  
  
  {
    path: 'login', component: LoginComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
