import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {ScheduleTableService} from './schedule-table.service';
import {DatePipe} from '@angular/common';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})

export class ScheduleTableComponent implements OnInit {

  TASK_DATA: any = [
  ];

  employeeList = [{id: 1, role: {'name': 'Worker'}}, {id: 2, role: {'name': 'Medic'}}, {id: 3, role: {'name': 'DinoTrainer'}}];
  locationList!: any;
  currentRole!: string;
  timeList = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']
  taskList = ['', 'Уборка', 'Кормление'];
  displayedColumns = ['Время', 'Задача', 'Локация'];
  dataSource = this.TASK_DATA;
  timeIndex = 0;
  currentTime: String = this.timeList[this.timeIndex];
  stopAdd = false;

  constructor(private notificationService: NotificationsService, private scheduleTableService: ScheduleTableService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getEmployeeList();
    this.getLocationList();
  }

  getEmployeeList(){
    this.scheduleTableService.getEmployeeList().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      if (res == undefined) {
        this.notificationService.warn('Нет сотрудников без расписания');
      }
      console.log(res);
      this.employeeList = res;
      // try {
      //   console.log(res);
      //   let ids = [];
      //   for (let i = 0; i < res.length; i++) {
      //     console.log(res[i]['id']);
      //     ids.push(res[i]['id']);
      //   }
      //   this.medicList = ids;
      // } catch (e) {
      // }
      // console.log(this.medicList);
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка доступных Медиков');
    });
  }

  getLocationList(){
    this.scheduleTableService.getLocationList().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      console.log(res);
      this.locationList = res;
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка доступных локаций');
    });
  }

  addRow(f: NgForm) {
    const newRow = JSON.parse(JSON.stringify(f.value));
    newRow['time'] = JSON.parse(JSON.stringify(this.currentTime));
    this.dataSource = [...this.dataSource, newRow];
    if (this.timeIndex == (this.timeList.length - 1)) {
      this.stopAdd = true;
    } else {
      this.timeIndex += 1;
      this.stopAdd = false;
    }
    this.currentTime = this.timeList[this.timeIndex];
  }

  removeRow() {
    if (this.timeIndex == this.timeList.length - 1 && this.stopAdd) {
      this.dataSource = this.dataSource.splice(0,this.dataSource.length-1);
      this.stopAdd = false;
      return
    }
    if (this.timeIndex != 0) {
      this.timeIndex -= 1;
      this.stopAdd = false;
    }
    this.currentTime = this.timeList[this.timeIndex];
    this.dataSource = this.dataSource.splice(0,this.dataSource.length-1)
  }

  onChangeEmployee(role: string) {
    // список задач зависит от роли сотрудника
    if (role == 'Worker') {
      this.currentRole = 'Работник';
      this.taskList = ['', 'Уборка', 'Кормление'];
    }
    if (role == 'Medic') {
      this.currentRole = 'Медик';
      this.taskList = ['', 'Лечение', 'Медосмотр'];
    }
    if (role == 'DinoTrainer') {
      this.currentRole = 'Дрессировщик';
      this.taskList = ['', 'Тренировка', 'Осмотр'];
    }
    if (role == 'Driver') {
      this.currentRole = 'Водитель';
      this.taskList = ['', 'Доставка еды', 'Перевозка материалов'];
    }
    if (role == 'Hunter') {
      this.currentRole = 'Хантер';
      this.taskList = ['', 'Патрулирование', 'Тренировка'];
    }
    this.dataSource = [];
    this.timeIndex = 0;
    this.currentTime = this.timeList[this.timeIndex];
  }

  toLocationId(str: string) {
    for (let i = 0; i < this.locationList.length; i++) {
      if (this.locationList[i].name == str){
        return this.locationList[i].id;
      }
    }
    return 0;
  }

  sendSchedule() {
    let schedule = JSON.parse(JSON.stringify(this.dataSource));
    let date = this.datePipe.transform(new Date(new Date().getTime() + (1000 * 60 * 60 * 24)),'MM-dd-yyyy');
    let userId = Number(schedule[0]['userId']);
    for (let i = 0 ; i < schedule.length; i++) {
      delete schedule[i]['userId'];
      schedule[i]['locationId'] = this.toLocationId(schedule[i]['location']);
      delete schedule[i]['location'];
      schedule[i]['dateTime'] = date + 'T' + schedule[i]['time'];
      delete schedule[i]['time'];
    }
    let sched = {
      'userId': userId,
      'schedules': schedule,
    }
    console.log(sched);
    this.scheduleTableService.sendTask(sched).subscribe(
      () => {
        this.notificationService.success("Успех", "Раписание отправлено");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка отправки расписания");
      }
    );
  }
}

export interface Task {
  time: string;
  task: string;
  location: number;
}
