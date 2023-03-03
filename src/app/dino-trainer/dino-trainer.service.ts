import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DinoTrainerService {

  baseApiUrl: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  getDinoList() {
    return this.http.get(this.baseApiUrl + '/api/dino');
  }

  sendReport(dino: any) {
    return this.http.post(this.baseApiUrl + `/api/dino/report/train`, dino)
      .pipe(
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }
}
