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
    {time: "10:00", task: "Кормление", location: 1},
    {time: "12:00", task: 'Уборка', location: 2},
    {time: "14:00", task: 'Кормление', location: 3},
    {time: "15:00", task: 'Уборка', location: 4},
    {time: "16:00", task: 'Кормление', location: 5},
  ];
  displayedColumns = ['Время', 'Задача', 'Локация'];
  hasSchedule!: boolean;

  constructor(public appService: AppService,
              private scheduleService: ScheduleService,
              private notificationsService: NotificationsService) {
    this.hasSchedule = true;
  }

  ngOnInit(): void {
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
      for (let i = 0; i < res.length; i++) {
        delete res[i]['id'];
        delete res[i]['user'];
        res[i]['time'] = res[i]['dateTime'].split('T')[1];
      }
      this.TASK_DATA = res;
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationsService.error('Ошибка получения расписания');
    });
  }
}

export interface UserTask {
  // start: boolean;
  time: string;
  task: string;
  location: number;
  // end: boolean;
}
