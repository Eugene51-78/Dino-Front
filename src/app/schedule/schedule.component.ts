import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class ScheduleComponent implements OnInit, OnDestroy {

  TASK_DATA: UserTask[] = [
  ];
  displayedColumns = ['Время', 'Задача', 'Локация'];
  interval: number | undefined;

  constructor(public appService: AppService,
              private scheduleService: ScheduleService,
              private notificationsService: NotificationsService) {
    this.appService.setEmployeeFromServer();
  }

  ngOnInit(): void {
    this.getSchedule();
    this.interval = setInterval(() => {this.getSchedule();}, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  getSchedule() {
    this.scheduleService.getSchedule().subscribe((res: any) => {
      if (res === null) {
        // console.log('res is null');
        return;
      }
      for (let i = 0; i < res.length; i++) {
        delete res[i]['id'];
        delete res[i]['user'];
        res[i]['time'] = res[i]['dateTime'].split('T')[1];
        res[i]['time'] = res[i]['time'].split(':00Z')[0];
        res[i]['location'] = res[i]['location']['name'];
      }
      this.TASK_DATA = res;
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationsService.error('Ошибка получения расписания');
    });
  }

  getRole() {
    return localStorage.getItem("ROLE");
  }
}

export interface UserTask {
  time: string;
  task: string;
  location: string;
}
