import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {ScheduleService} from '../schedule/schedule.service';
import {NotificationsService} from 'angular2-notifications';
import {DatePipe} from '@angular/common';
import {InspectorService} from './inspector.service';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent implements OnInit {

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
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationsService.error('Ошибка получения расписания');
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
  // start: boolean;
  time: string;
  task: string;
  location: number;
  // end: boolean;
}
