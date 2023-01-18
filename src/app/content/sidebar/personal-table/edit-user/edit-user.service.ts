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
export class EditUserService {
  baseApiUrl: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  editUser(user: any): Observable<any> {
    console.log(user);
    return this.http.patch<any>(`${this.baseApiUrl}/api/user`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseApiUrl}/api/user/${id}`);
  }
}
