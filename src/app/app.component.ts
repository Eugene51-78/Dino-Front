import {Component, OnInit} from '@angular/core';
import {AuthService} from './login/auth.service';
import { getMessaging, getToken, onMessage, } from "firebase/messaging";
import {environment} from "../environments/environment";
import {interval, switchMap} from 'rxjs';
import {AppService} from './app.service';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private auth: AuthService, private appService: AppService, private notificationService: NotificationsService, private router: Router) {
  }

  title = 'Dino-Front';
  options = {
    timeOut: 3000
  }

  ngOnInit(): void {
    this.getAlarmFromServer();
    //this.appService.getAlarm();
    setInterval(() => {
      this.getAlarmFromServer();
    }, 1000);
    //setInterval( () => { console.log("123"); }, 3000);
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

  getAlarmFromServer() : any{
    this.appService.getAlarmStatus().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return null;
      }
      var alarmRes = (res["value"] === 'true');
      this.appService.alarm = res;
      this.appService.setAlarm(res);
      //localStorage.setItem("alarm", res);
      //console.log(this.appService.alarm);
      return res;
    }, (err: { message: any; }) => {
      console.log('Ошибка', err);
      // this.notificationService.error('Ошибка получения')
    });
  }
}
