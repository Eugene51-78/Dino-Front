import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {query} from '@angular/animations';
import {ContentService} from '../content/content.service';
import {AppService} from '../app.service';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router, private notifications: NotificationsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.authService.isAuthenticated()) {
      const role = localStorage.getItem('ROLE');
      if (role !== undefined) {
        if (route.data['role'] && route.data['role'].indexOf(role) === -1) {
          this.router.navigate(['/content'], {
            queryParams: {
              accessDenied: true
            }
          });
          this.notifications.warn('Страница недоступна для вашей роли');
          return of(false);
        }
      }
      return of(true);
    } else {
        this.router.navigate(['/login'],{
          queryParams: {
            accessDenied: true
          }
        })
      return of(false);
      }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
