import { Component, OnInit } from '@angular/core';
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

  TASK_DATA: UserTask[] = [
    {start: true, time: "10:00", task: "Кормление", location: 1, end: true},
    {start: true, time: "12:00", task: 'Уборка', location: 2, end: false},
    {start: false, time: "14:00", task: 'Кормление', location: 3, end: false},
    {start: false, time: "15:00", task: 'Уборка', location: 4, end: false},
    {start: false, time: "16:00", task: 'Кормление', location: 5, end: false},
  ];
  displayedColumns = ['Начало', 'Время', 'Задача', 'Локация', 'Окончание'];

  constructor(public appService: AppService,
              private scheduleService: ScheduleService,
              private notificationsService: NotificationsService) {

  }

  ngOnInit(): void {
    // на бэке добавить 2 булевых поля каждой задаче - start и end
    setTimeout(() => {
      this.getSchedule();
    }, 1);
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

  changeStartStatus(row: any) {
    console.log(row);
    //   отправить запрос
  }
  changeEndStatus(row: any) {
    console.log(row);
    //   отправить запрос
  }

  checkStartStatus(row: any) {
    setTimeout(() => {
      this.scheduleService.getStartStatus(row).subscribe((res: any) => {
        if (res === null) {
          console.log('res is null');
          return;
        }
        console.log(res);
      }, (err: { message: any; }) => {
        console.log('Ошибка', err.message);
        this.notificationsService.error('Ошибка получения расписания')
      });
    }, 1000);
    return true;
  }

  checkEndStatus(row: any) {
    console.log(row);
    //   отправить запрос
    return true;
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

export interface UserTask {
  start: boolean;
  time: string;
  task: string;
  location: number;
  end: boolean;
}
