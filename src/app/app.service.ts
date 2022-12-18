import { HttpClient } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {Alarm} from "./alarm/alarm.interface";
import {environment} from '../environments/environment';
import {Employee} from './content/employee.interface';

@Injectable()
export class AppService {

  baseApiUrl: string;

  alarm!: Alarm;
  employee!: Employee;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
    this.setEmployeeFromServer();
  }

  getAlarmStatus() {
    return this.http.get(this.baseApiUrl + '/alarm');
  }

  getAlarm(){
    let state = localStorage.getItem('alarm');
    if (state === 'true') {
      this.alarm.value = true;
    } else {
      this.alarm.value = false;
    }
  }

  setAlarm(alarm: Alarm) {
    if (alarm.value) {
      localStorage.setItem('alarm', 'true');
    } else {
      localStorage.setItem('alarm', 'false');
    }
  }

  getEmployeeFromServer() {
    return this.http.get(this.baseApiUrl + '/api/user/me');
  }

  setEmployeeFromServer() {
    this.getEmployeeFromServer().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return null;
      }
      this.employee = res;
      console.log(this.employee);
      return res;
      //this.notificationService.success('Получено')
    }, (err: { message: any; }) => {
      // this.notificationService.error('Ошибка', 'Не удалось получить сведения об аккаунте!')
      return null;
    });
  }
}
