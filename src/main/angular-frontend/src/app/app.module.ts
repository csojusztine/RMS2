import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonService } from './service/person.service';
import { HomeComponent } from './component/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './component/header/header.component';
import { MachineListComponent } from './machine-list/machine-list.component';
import { MachineService } from './service/machine.service';


@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    HomeComponent,
    HeaderComponent,
    MachineListComponent
    
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
  providers: [PersonService, MachineService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
