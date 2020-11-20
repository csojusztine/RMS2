import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Machine } from '../model/machine';



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

  getMachineById(id: string) {
    const url = this.machine_API + '/' + id;
    return this.httpClient.get<Machine>(url);
  }

  deleteMachine(id: string) {
    const url = this.machine_API + '/' + id;
    return this.httpClient.delete(url);
  }

  /*saveSubject(subject: Subject) {
    return this.httpClient.post(SUBJECT_API, subject, {withCredentials: true, responseType: "text"});
  }

  loadPersonsForSubject(id) {
    const url = SUBJECT_API + '/' + id + '/persons';
    return this.httpClient.get<Person[]>(url, {withCredentials: true});
  }*/
}
