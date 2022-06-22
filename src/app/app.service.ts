import { HttpClient } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {Alarm} from "./alarm/alarm.interface";
import {environment} from '../environments/environment';

@Injectable()
export class AppService {

  baseApiUrl: string;

  alarm!: Alarm;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
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

}
