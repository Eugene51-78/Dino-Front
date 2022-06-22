import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class NotificationService {

  baseApiUrl: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  getNotifications() {
    return this.http.get(this.baseApiUrl + '/api/notification');
  }
}
