import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddDinoService {
  baseApiUrl: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  addDino(dino: any): Observable<any> {
    console.log(dino);
    return this.http.post<any>(`${this.baseApiUrl}/api/dino`, dino);
  }

  getTypeList() {
    return this.http.get(this.baseApiUrl + '/api/dino/type');
  }
}
