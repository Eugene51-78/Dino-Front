import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class ContentService {

  baseApiUrl: string;

  alarm!: {isOn: boolean, type:string};
  employee!: { role: string; name: string; };

  constructor(private http: HttpClient) {
    this.baseApiUrl = "localhost:8080"
    this.employee = {role: "Medic", name:"Карл"};
    this.alarm = {isOn: false, type: "None"};
  }

  addPushSubscriber(sub:any) {
    return this.http.post('/notifications', sub);
  }

  getEmployeeFromServer() {
    return this.http.get(this.baseApiUrl + '/employee');
  }

  getAlarmFromServer() {
    return this.http.get(this.baseApiUrl + '/alarm');
  }

  getHunterList() {
    return this.http.get(this.baseApiUrl + '/hunter');
  }

  getCurrentHunterID() {
    return this.http.get(this.baseApiUrl + 'curhunter');
  }

  postHunterRequest(id: number) {
    return this.http.post(this.baseApiUrl + '/hunter', id);
  }

  setEmployee(employee: {role: string; name: string }) {
    this.employee = employee;
  }

  getEmployee() {
    return this.employee;
  }

 getEmployeeRole(): string{
    return <string>this.employee.role;
 }

 getAlarm() {
      return this.alarm;
 }

 setAlarm(alarm: {isOn: boolean, type:string}) {
    this.alarm = alarm;
 }

 setIsAlarmOn(val: boolean){
    this.alarm.isOn = val;
 }

 setAlarmType(type: string){
   this.alarm.type = type;
 }

}
