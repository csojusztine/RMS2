import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import {MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox';

import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonService } from './service/person.service';
import { HomeComponent } from './component/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MachineListComponent } from './machine-list/machine-list.component';
import { MachineService } from './service/machine.service';


import { AuthService } from './service/auth.service';
import { AuthInterceptor } from './helpers/auth-interceptor';
import { ProfileComponent } from './component/profile/profile.component';
import { TokenStorageService } from './service/token-storage.service';
import { PersonMachinesListComponent } from './person-machines-list/person-machines-list.component';
import { EditMachineFormComponent } from './edit-machine-form/edit-machine-form.component';
import { NgSelectModule } from '@ng-select/ng-select';




@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    HomeComponent,
    MachineListComponent,
    ProfileComponent,
    PersonMachinesListComponent,
    EditMachineFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [PersonService, MachineService, AuthService, AuthInterceptor, TokenStorageService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
