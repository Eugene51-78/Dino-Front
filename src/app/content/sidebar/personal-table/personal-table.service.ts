import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {PersonalTableComponent} from './personal-table.component';
import {Employee} from '../../employee.interface';
import {environment} from '../../../../environments/environment';

@Injectable()
export class PersonalTableService {
  baseApiUrl: string;
  employee!: Employee;
  fbToken!: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }
}
