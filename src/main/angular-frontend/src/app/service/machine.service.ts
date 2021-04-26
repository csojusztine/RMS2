import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact';

import { Machine } from '../model/machine';
import { Person } from '../model/person';
import { Work } from '../model/work';



@Injectable({
  providedIn: 'root'
})
export class MachineService {


  machine_API: string;

  constructor(private httpClient: HttpClient) {
    this.machine_API = 'http://localhost:8080/api/machines';

  }

  getMachines() {
    return this.httpClient.get<Machine[]>(this.machine_API);
  }

  getMachineById(id: number) {
    const url = this.machine_API + '/' + id;
    return this.httpClient.get<Machine>(url);
  }

  loadWorksforMachine(id: number){
    const url = this.machine_API + '/' + id + '/works';
    return this.httpClient.get<Work[]>(url);
  }

  getMachineByIdentifier(id: number) {
    const url = 'http://localhost:8080/api/machines/' + id + '/machine';
    return this.httpClient.get<Machine>(url);
  }

  sendEmail(contact: Contact) {
    const url = 'http://localhost:8080/api/contact';
    return this.httpClient.post(url, contact);
  }
  


  loadUserForMAchine(id: number) {
    const url = this.machine_API +'/' + id + '/user';
    return this.httpClient.get<Person>(url);
  }
}
