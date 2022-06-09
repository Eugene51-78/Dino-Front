import {Injectable} from '@angular/core';
import {User} from './user.interface';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private token: null | string | undefined = null;

  constructor(private http: HttpClient) {
  }
  login(user: User): Observable<{token: string}> {
    return this.http.post<{ token: string; }>('auth/login', user)
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
