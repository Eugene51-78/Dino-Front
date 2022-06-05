import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class ContentService {

  baseApiUrl: string;

  employeeRole: string | undefined;
  isAlarmOn: boolean | undefined;
  alarmType: string | undefined;

  constructor(private http: HttpClient) {
    this.employeeRole = "Manager";
    this.baseApiUrl = "localhost:8080"
  }

  getEmployee() {
    return this.http.get(this.baseApiUrl + '/employee');
  }

  getEmployeeRole(): string{
    return <string>this.employeeRole;
  }

  setEmployeeRole(val: string){
    this.employeeRole = val;
  }

  getIsAlarmOn(): boolean{
    return <boolean>this.isAlarmOn;
  }

  setIsAlarmOn(val: boolean){
    this.isAlarmOn = val;
  }

  getAlarmType() {
    return this.alarmType;
  }

  setAlarmType(type: string){
    this.alarmType = type;
  }

}
