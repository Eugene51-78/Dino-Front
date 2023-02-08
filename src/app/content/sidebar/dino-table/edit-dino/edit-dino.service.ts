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

  editDino(dino: any): Observable<any> {
    console.log(dino);
    return this.http.patch<any>(`${this.baseApiUrl}/api/dino`, dino);
  }

  deleteDino(id: number): Observable<Dino> {
    return this.http.delete<Dino>(`${this.baseApiUrl}/api/dino/${id}`);
  }

  getTypeList() {
    return this.http.get(this.baseApiUrl + '/api/dino/type');
  }

}
