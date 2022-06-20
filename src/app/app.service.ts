import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AppService {

  baseApiUrl: string;

  alarm!: { isOn: boolean, type: string };

  constructor(private http: HttpClient) {
    this.baseApiUrl = "http://localhost:8081";
  }

  getAlarmStatus() {
    return this.http.get(this.baseApiUrl + '/api/alarm');
  }
}
