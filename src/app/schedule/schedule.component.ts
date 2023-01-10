import { Component, OnInit } from '@angular/core';
import {Task} from '../content/sidebar/schedule-table/schedule-table.component';
import {AppService} from '../app.service';
import {MatTableDataSource} from '@angular/material/table';
import {Notification} from '../notification/notification.component';
import {ScheduleService} from './schedule.service';
import {NotificationsService} from 'angular2-notifications';
import * as moment from 'moment';
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  TASK_DATA: Task[] = [
    {time: "10:00", task: "Кормление", location: 1},
    {time: "12:00", task: 'Уборка', location: 2},
    {time: "14:00", task: 'Кормление', location: 3},
    {time: "15:00", task: 'Уборка', location: 4},
    {time: "16:00", task: 'Кормление', location: 5},
  ];
  displayedColumns = ['Начало', 'Время', 'Задача', 'Локация', 'Окончание'];

  constructor(public appService: AppService,
              private scheduleService: ScheduleService,
              private notificationsService: NotificationsService) {

  }

  ngOnInit(): void {
    // на бэке добавить 2 булевых поля каждой задаче - start и end
    this.getSchedule();
  }

  getSchedule() {
    this.scheduleService.getSchedule().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      this.TASK_DATA = res;
      //console.log(this.notifications);
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationsService.error('Ошибка получения расписания')
    });
  }

  checkTimeStart(taskTime: string) {
    const datepipe: DatePipe = new DatePipe('en-US')
    let dateTime = new Date();
    let curHour = datepipe.transform(dateTime, 'HH')
    curHour = '11'

    const targetString : string = taskTime;
    const rExp: RegExp = /\d\d/;
    const hour = rExp.exec(targetString);
      // @ts-ignore
    if (curHour - hour >= -1 && curHour - hour <= 1) {
      return true;
    } else {
      return false;
    }
  }
  checkTimeEnd(taskTime: string) {
    const datepipe: DatePipe = new DatePipe('en-US')
    let dateTime = new Date();
    let curHour = datepipe.transform(dateTime, 'HH')
    curHour = '11'

    const targetString : string = taskTime;
    const rExp: RegExp = /\d\d/;
    const hour = rExp.exec(targetString);
    // @ts-ignore
    if (curHour - hour >= 0) {
      return true;
    } else {
      return false;
    }
  }

}
