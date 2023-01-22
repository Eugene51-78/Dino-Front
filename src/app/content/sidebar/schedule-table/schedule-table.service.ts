import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Employee} from '../../employee.interface';
import {environment} from '../../../../environments/environment';
import {User} from '../personal-table/user';

@Injectable({
  providedIn: 'root',
})
export class ScheduleTableService {
  baseApiUrl: string;
  employee!: Employee;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  // Observable<any[]>
  getEmployeeList() {
    return this.http.get(this.baseApiUrl + '/api/user');
      // .pipe<any[]>(map((data: any) => data.users));
  }

  getLocationList() {
    return this.http.get(this.baseApiUrl + '/api/location');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseApiUrl}/api/user`, user);
  }

  sendSchedule(schedule: any){
    return this.http.post(`${this.baseApiUrl}/api/schedule`, schedule)
      .pipe(
        catchError(errorRes =>{
          return throwError(errorRes);
        })
      );
  }
}
