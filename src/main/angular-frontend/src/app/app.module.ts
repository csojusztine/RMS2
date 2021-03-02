import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
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
import { LoginComponent } from './component/login/login.component';

import { AuthService } from './service/auth.service';
import { AuthInterceptor } from './helpers/auth-interceptor';
import { ProfileComponent } from './component/profile/profile.component';
import { TokenStorageService } from './service/token-storage.service';



@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    HomeComponent,
    MachineListComponent,
    LoginComponent,
    ProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
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
