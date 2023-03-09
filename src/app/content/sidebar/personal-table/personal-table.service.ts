import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {PersonalTableComponent} from './personal-table.component';
import {Employee} from '../../employee.interface';
import {environment} from '../../../../environments/environment';
import { User, UserColumns } from './user';

@Injectable({
  providedIn: 'root',
})
export class PersonalTableService {
  baseApiUrl: string;
  employee!: Employee;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  getUsers() {
    return this.http.get(this.baseApiUrl + '/api/user');
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.baseApiUrl}/api/user/${user.id}`, user);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseApiUrl}/api/user`, user);
  }
}
