import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {ScheduleService} from '../schedule/schedule.service';
import {NotificationsService} from 'angular2-notifications';
import {DatePipe} from '@angular/common';
import {InspectorService} from './inspector.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent implements OnInit, OnDestroy {

  TASK_DATA: UserTask[] = [
    {time: "", task: "", location: ""},
  ];
  displayedColumns = ['Время', 'Задача', 'Локация']; //'ИД сотрудника',
  hasSchedule!: boolean;
  interval: number | undefined;
  dataFlag = false;

  constructor(public appService: AppService,
              private inspectorService: InspectorService,
              private notificationsService: NotificationsService,
              private router: Router) {
    this.appService.setEmployeeFromServer();
    this.hasSchedule = true;
    this.getSchedule();
  }

  ngOnInit(): void {
    this.interval = setInterval(() => {this.getSchedule(); console.log("запрос задач")}, 2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  getSchedule() {
    this.inspectorService.getSchedule().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      console.log(res);
      const datepipe: DatePipe = new DatePipe('en-US')
      for (let i = 0; i < res.length; i++) {
        res[i].dateTime = datepipe.transform(res[i].dateTime, 'HH:mm')
      }
      this.TASK_DATA = res;
      this.dataFlag = true;
      clearInterval(this.interval);
      this.interval = undefined;
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      // this.notificationsService.error('Ошибка получения расписания');
    });
  }

  createSchedule() {
    this.inspectorService.createSchedule().subscribe((res) => {
      this.notificationsService.success('Успех', 'Задачи сформированы');
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(["/inspector"]);
      });
    }, (err: { message: any; }) => {
      console.log('Ошибка', err);
      this.notificationsService.error('Ошибка формирования задач')
      return null;
    });
    this.getSchedule();
    console.log('Create schedule');
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
