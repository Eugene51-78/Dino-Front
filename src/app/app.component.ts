import {Component, OnInit} from '@angular/core';
import {AuthService} from './login/auth.service';
import {AngularFireMessaging} from '@angular/fire/compat/messaging';
import {mergeMap} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  readonly VAPID_PUBLIC_KEY = "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo";

  constructor(private auth: AuthService, private afMessaging: AngularFireMessaging) {
  }

  title = 'Dino-Front';
  options = {
    timeOut: 3000
  }

  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken);
    }
  }

  requestPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },
      );
  }

  deleteToken() {
    this.afMessaging.getToken
      .pipe(mergeMap(token => this.afMessaging.deleteToken(token!)))
      .subscribe(
        (token) => { console.log('Token deleted!'); },
      );
  }

  listen() {
    this.afMessaging.messages
      .subscribe((message) => { console.log(message); });
  }
}
