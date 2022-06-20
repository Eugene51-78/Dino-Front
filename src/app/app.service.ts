import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Alarm} from "./alarm/alarm.interface";

@Injectable()
export class AppService {

  baseApiUrl: string;

  alarm!: Alarm;

  constructor(private http: HttpClient) {
    this.baseApiUrl = "http://localhost:8081";
  }

  getAlarmStatus() {
    return this.http.get(this.baseApiUrl + '/alarm');
  }
}
