import {Component, OnInit, ViewChild} from '@angular/core';
import {ContentComponent} from '../content/content.component';
import {ContentService} from '../content/content.service';
import {NotificationsService} from 'angular2-notifications';
import { Alarm } from './alarm.interface';
import {AppService} from '../app.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  employeeType: String | undefined;

  @ViewChild('ContentComponent') contentComponent: ContentComponent | undefined;
  constructor(public contentService: ContentService, private notificationService: NotificationsService, public appService: AppService) {
    // // this.isAlarmOn = this.contentService.getIsAlarmOn();
    // if (localStorage.getItem('alarm') === 'true')
    //   this.isAlarmOn = true;
    // else {
    //   this.isAlarmOn = false;
    // }
    // console.log(this.isAlarmOn);
  }

  ngOnInit() {

  }

  changeAlarm(type: number) {
    if (type == 0)
      this.sendAlarm({type: 'Attack', value: true});
    if (type == 1)
      this.sendAlarm({type: 'Escape', value: true});
    if (type == 2)
      this.sendAlarm({type: 'Attack', value: false});

    // localStorage.setItem('alarm', String(this.contentService.getAlarm().isOn));
    // localStorage.setItem('alarmType', (this.contentService.getAlarm().type));
  }

  sendAlarm(alarm: Alarm) {
    this.contentService.sendAlarm(alarm).subscribe((res) => {
      console.log('Тревога отправлена успешно');
    }, (err: { message: any; }) => {
      console.log('Ошибка', err);
      // this.notificationService.error('Ошибка получения')
      return null;
    });
  }

  getRole() {
    return localStorage.getItem("ROLE");
  }
}
