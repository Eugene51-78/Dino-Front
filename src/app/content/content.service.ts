import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class ContentService {

  baseApiUrl: string;

  alarm!: {isOn: boolean, type:string};
  employee!: {"id": number, email: string, firstName: string,
    secondName: string, middleName: string, role: { id: number, name: string },
    age: number, location:{"id": number, name: string, longitude: number, latitude: number},
    isBusy: boolean};

  constructor(private http: HttpClient) {
    this.baseApiUrl = "localhost:8081"
    this.employee = {"id": 1, email: "a@a.ru", firstName: "Karlo",
      secondName: "Karlo", middleName: "Karlo", role: { id: 1, name: "Karlo" },
      age: 20, location:{"id": 1, name: "Karlo", longitude: 10, latitude: 10},
      isBusy: false};
    this.alarm = {isOn: false, type: "None"};
  }

  getEmployee(): { id: number; email: string; firstName: string; secondName: string; middleName: string; role: { id: number; name: string }; age: number; location: { id: number; name: string; longitude: number; latitude: number }; isBusy: boolean } {
    return this.employee;
  }

  setEmployee(value: { id: number; email: string; firstName: string; secondName: string; middleName: string; role: { id: number; name: string }; age: number; location: { id: number; name: string; longitude: number; latitude: number }; isBusy: boolean }) {
    this.employee = value;
  }

  addPushSubscriber(sub:any) {
    return this.http.post('/notifications', sub);
  }

  getEmployeeFromServer() {
    return this.http.get(this.baseApiUrl + '/user/me');
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

 getEmployeeRole(): string{
    return <string>this.employee.role.name;
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
