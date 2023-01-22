import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {DinoTableComponent} from './dino-table.component';
import {Employee} from '../../employee.interface';
import {environment} from '../../../../environments/environment';
import { Dino, DinoColumns } from './dino';

@Injectable({
  providedIn: 'root',
})
export class DinoTableService {
  baseApiUrl: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  getDino() {
    return this.http.get(this.baseApiUrl + '/api/user');
  }
}
