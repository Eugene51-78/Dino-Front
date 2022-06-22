import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseApiUrl: string;
  // employeeRole: string | undefined;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  getMomentumTask() {
    return this.http.get(this.baseApiUrl + '/api/task/last');
  }

  acceptMomentumTask(id: number) {
    return this.http.post(this.baseApiUrl + `/api/task/confirm?taskId=${id}`, null)
      .pipe(
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  refuseMomentumTask(id: number) {
    return this.http.post(this.baseApiUrl + '/api/task/cancel?taskId=' + id, null)
      .pipe(
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }
}
