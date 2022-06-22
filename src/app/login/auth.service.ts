import {Injectable} from '@angular/core';
import {User} from './user.interface';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {combineChange} from '@angular/fire/compat/firestore';
import {ContentService} from "../content/content.service";
import {ContentComponent} from "../content/content.component";
import {initializeApp} from "firebase/app";
import {environment} from "../../environments/environment";
import {deleteToken, getMessaging} from "firebase/messaging";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private token: null | string | undefined = null;
  private baseApiUrl!: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApi;
  }

  login(user: User): Observable<{token: string}> {
    //console.log(user);
    return this.http.post<{ token: string; }>(this.baseApiUrl+'/auth', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      )
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string {
    return <string>this.token;
  }

  isAuthenticated(): boolean {
    this.setToken(localStorage.getItem('auth-token'));
    return !!this.token;
  }

  revokeToken(){
    const firebaseApp = initializeApp(environment.firebase);
    const messaging = getMessaging(firebaseApp);
    deleteToken(messaging).then(r => {
      //console.log("Token deleted")
    })
  }

  logout() {
    this.setToken(null);
    this.revokeToken()
    localStorage.removeItem('auth-token');
  }
}
