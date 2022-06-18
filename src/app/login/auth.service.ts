import {Injectable} from '@angular/core';
import {User} from './user.interface';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {combineChange} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private token: null | string | undefined = null;

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{token: string}> {
    console.log(user);
    return this.http.post<{ token: string; }>('http://localhost:8081/auth', user)
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
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.removeItem('auth-token');
  }
}
