import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // baseApiUrl: string;
  // employeeRole: string | undefined;

  constructor(private http: HttpClient) {}

  getMomentumTask() {
    return this.http.get('baseApiUrl' + '/momentum');
  }

  acceptMomentumTask(id: number) {
    return this.http.post('baseApiUrl' + '/momentum', id)
      .pipe(
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  refuseMomentumTask(id: number) {
    return this.http.post('baseApiUrl' + '/momentum', id)
      .pipe(
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

}
