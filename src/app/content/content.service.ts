import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Employee} from './employee.interface';
import {Alarm} from '../alarm/alarm.interface';
import {environment} from '../../environments/environment';

@Injectable()
export class ContentService {

  baseApiUrl: string;

  alarm!: {isOn: boolean, type:string};
  employee!: Employee;
  fbToken!: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
    this.alarm = {isOn: false, type: "None"};
  }

  sendFireBaseToken(token: any){
    return this.http.post(`${this.baseApiUrl}/api/notification/token`, token)
      .pipe(
        catchError(errorRes =>{
          return throwError(errorRes);
        })
      );
  }

  sendAlarm(alarm: Alarm){
    return this.http.post(`${this.baseApiUrl}/alarm`, alarm)
      .pipe(
        catchError(errorRes =>{
          return throwError(errorRes);
        })
      );
  }

  getEmployee(): { id: number; email: string; firstName: string; secondName: string; middleName: string; role: { id: number; name: string }; age: number; location: { id: number; name: string; longitude: number; latitude: number }; isBusy: boolean } {
    return this.employee;
  }

  setEmployee(value: { id: number; email: string; firstName: string; secondName: string; middleName: string; role: { id: number; name: string }; age: number; location: { id: number; name: string; longitude: number; latitude: number }; isBusy: boolean }) {
    this.employee = value;
  }

  getFbToken(){
    return this.fbToken;
  }

  setFbToken(token: string){
    this.fbToken = token;
  }

  addPushSubscriber(sub:any) {
    return this.http.post('/notifications', sub);
  }

  stopMomentumTask(id: number) {
    return this.http.post(this.baseApiUrl + '/api/task/end?taskId='+id, null);
  }

  getEmployeeFromServer() {
    return this.http.get(this.baseApiUrl + '/api/user/me');
  }

  getAlarmFromServer() {
    return this.http.get(this.baseApiUrl + '/alarm');
  }

  getHunterList() {
    return this.http.get(this.baseApiUrl + '/api/user?role=Hunter');
  }

  getMomentumTask() {
    return this.http.get(this.baseApiUrl + '/api/task/last');
  }

  getCurrentMedicID() {
    return this.http.get(this.baseApiUrl + '/curmedic');
  }

  hunterRequest(task: any) {
    return this.http.post(`${this.baseApiUrl}/api/task`, task)
      .pipe(
        catchError(errorRes =>{
          return throwError(errorRes);
        })
      );
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
