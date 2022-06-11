import {Component, OnInit, ViewChild} from '@angular/core';
import {ContentComponent} from '../content/content.component';
import {ContentService} from '../content/content.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  isAlarmOn: boolean;
  employeeType: String | undefined;

  @ViewChild('ContentComponent') contentComponent: ContentComponent | undefined;
  constructor(public contentService: ContentService, private notificationService: NotificationsService) {
    this.employeeType = this.contentService.getEmployeeRole();
    console.log(this.employeeType);
    // this.isAlarmOn = this.contentService.getIsAlarmOn();
    if (localStorage.getItem('alarm') === 'true')
      this.isAlarmOn = true;
    else {
      this.isAlarmOn = false;
    }
    console.log(this.isAlarmOn);
  }

  ngOnInit() {

  }

  changeAlarm(type: number) {
    if (type == 0)
      this.contentService.setAlarmType("Attack");
    if (type == 1)
      this.contentService.setAlarmType("Escape");
    if (type == 2)
      this.contentService.setAlarmType("None");
    this.isAlarmOn = !this.isAlarmOn;
    this.contentService.setIsAlarmOn(this.isAlarmOn);
    localStorage.setItem('alarm', String(this.contentService.getAlarm().isOn));
    localStorage.setItem('alarmType', (this.contentService.getAlarm().type));
    this.notificationService.success("Успех", "Все нормас");
    this.notificationService.info("Инфо", "Такого нет");
    this.notificationService.error("Ошибка", "Не удалось что-то");
  }
}
