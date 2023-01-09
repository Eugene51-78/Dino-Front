import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  baseApiUrl: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  getDinoList() {
    return this.http.get(this.baseApiUrl + '/api/dino');
  }

  getLocationList() {
    return this.http.get(this.baseApiUrl + '/api/location');
  }

  getMedicList() {
    return this.http.get(this.baseApiUrl + '/api/user?role=Medic');
  }

  getDinoTrainerList() {
    return this.http.get(this.baseApiUrl + '/api/user?role=DinoTrainer');
  }

  getDriverList() {
    return this.http.get(this.baseApiUrl + '/api/user?role=Driver');
  }

  getTransportTask() {
    return this.http.get(this.baseApiUrl + '/api/transport/last');
  }

  stopTransportation(id: number) {
    return this.http.post(this.baseApiUrl + '/api/transport/end?taskId='+id, null);
  }

  transportationRequest(task: any) {
    return this.http.post(`${this.baseApiUrl}/api/transport`, task)
      .pipe(
        catchError(errorRes =>{
          return throwError(errorRes);
        })
      );
  }

  getRecommendations() {
    return this.http.get(this.baseApiUrl + '/api/recommend');
  }
}
