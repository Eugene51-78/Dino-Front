import {Component, OnInit} from '@angular/core';
import {AuthService} from './login/auth.service';
import { getMessaging, getToken, onMessage, } from "firebase/messaging";
import {environment} from "../environments/environment";
import {initializeApp} from "firebase/app";
import {parseJson} from "@angular/cli/utilities/json-file";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
// private afMessaging: AngularFireMessaging
  constructor(private auth: AuthService) {
  }

  title = 'Dino-Front';
  options = {
    timeOut: 3000
  }

  ngOnInit(): void {

    // setInterval( () => { this.listen(firebaseApp); }, 3000);
  }
  //
  // ngAfterViewInit(): void {
  //
  // }

  requestPermission(firebaseApp: any) {
    const messaging = getMessaging(firebaseApp);
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey}).then(
      (currentToken) => {
        if (currentToken) {
          console.log("Hurraaa!!! we got the token.....");
          console.log(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen(firebaseApp: any) {
    const messaging = getMessaging(firebaseApp);
    console.log("Receiving messages...")
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // this.message=payload;
      // const f = parseJson(payload.toString())
    });
  }

  // requestPermission() {
  //   this.afMessaging.requestToken
  //     .subscribe(
  //       (token) => { console.log('Permission granted! Save to the server!', token); },
  //       (error) => { console.error(error); },
  //     );
  // }

  // deleteToken() {
  //   this.afMessaging.getToken
  //     .pipe(mergeMap(token => this.afMessaging.deleteToken(token!)))
  //     .subscribe(
  //       (token) => { console.log('Token deleted!'); },
  //     );
  // }

  // listen() {
  //   this.afMessaging.messages
  //     .subscribe((message) => { console.log(message); });
  // }
}
