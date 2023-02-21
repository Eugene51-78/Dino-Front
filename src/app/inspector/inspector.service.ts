import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class InspectorService {

  baseApiUrl: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  getSchedule() {
    return this.http.get(this.baseApiUrl + '/api/schedule');
  }

  createSchedule() {
    return this.http.post(this.baseApiUrl + '/api/schedule/inspector', null)
      .pipe(
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }
}
