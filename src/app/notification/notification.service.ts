import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class NotificationService {

  baseApiUrl: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = "localhost:8080"
  }

  getNotifications() {
    return this.http.get(this.baseApiUrl + '/notification');
  }
}
