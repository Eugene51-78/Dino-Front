import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Employee} from '../../../employee.interface';
import {environment} from '../../../../../environments/environment';
import { User, UserColumns } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  baseApiUrl: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseApiUrl}/user/add`, user);
  }
}
