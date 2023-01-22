import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Employee} from '../../../employee.interface';
import {environment} from '../../../../../environments/environment';
import { Dino, DinoColumns } from '../dino';

@Injectable({
  providedIn: 'root',
})
export class EditDinoService {
  baseApiUrl: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  editDino(user: any): Observable<any> {
    console.log(user);
    return this.http.patch<any>(`${this.baseApiUrl}/api/user`, user);
  }

  deleteUser(id: number): Observable<Dino> {
    return this.http.delete<Dino>(`${this.baseApiUrl}/api/user/${id}`);
  }
}
