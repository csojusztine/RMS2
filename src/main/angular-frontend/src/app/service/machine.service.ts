import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine } from '../model/machine';
import { Person } from '../model/person';



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

  deleteMachine(id) {
    const url = this.machine_API + "/" + id;
    return this.httpClient.delete(url);
  }

  

  /*saveSubject(subject: Subject) {
    return this.httpClient.post(SUBJECT_API, subject, {withCredentials: true, responseType: "text"});
  }
*/
  /*loadUserForMAchine(id: number) {
    const url = this.machine_API +'/' + id + '/user';
    return this.httpClient.get<Person>(url);
  }*/
}
