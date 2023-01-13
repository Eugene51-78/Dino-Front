import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Employee} from '../../employee.interface';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleTableService {
  baseApiUrl: string;
  employee!: Employee;
  fbToken!: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  getEmployeeList(): Observable<any[]> {
    return this.http
      .get(this.baseApiUrl + '/api/user')
      .pipe<any[]>(map((data: any) => data.users));
  }
}
