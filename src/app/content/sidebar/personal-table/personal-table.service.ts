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
  fbToken!: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get(this.baseApiUrl + '/api/user')
      .pipe<User[]>(map((data: any) => data.users));
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.baseApiUrl}/${user.id}`, user);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseApiUrl}/user/add`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseApiUrl}/user/${id}`);
  }
}
