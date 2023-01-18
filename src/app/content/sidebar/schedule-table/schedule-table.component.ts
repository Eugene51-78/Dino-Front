import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {ScheduleTableService} from './schedule-table.service';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})

export class ScheduleTableComponent implements OnInit {

  TASK_DATA: Task[] = [
    // {time: "10:00", task: "Кормление", location: 1},
    // {time: "12:00", task: 'Уборка', location: 2}
    // {time: "14:00", task: 'Кормление', location: 3},
    // {time: "15:00", task: 'Уборка', location: 4},
    // {time: "16:00", task: 'Кормление', location: 5},
  ];

  employeeList = [{id: 1, role: 'Worker'}, {id: 2, role: 'Medic'}, {id: 3, role: 'DinoTrainer'}]
  timeList = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']
  taskList!: string[];
  displayedColumns = ['Время', 'Задача', 'Локация'];
  dataSource = this.TASK_DATA;
  timeIndex = 0
  currentTime = this.timeList[this.timeIndex];
  stopAdd = false;

  constructor(private notificationService: NotificationsService, private scheduleTableService: ScheduleTableService) {
  }

  ngOnInit(): void {
    console.log(this.dataSource);
    this.getEmployeeList();
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

  addRow(f: NgForm) {
    const newRow = f.value;
    newRow['time'] = this.currentTime;
    console.log(this.dataSource);
    this.dataSource = [...this.dataSource, newRow];
    if (this.timeIndex == (this.timeList.length - 1)) {
      this.stopAdd = true;
    } else {
      this.timeIndex += 1;
    }
    this.currentTime = this.timeList[this.timeIndex];
    // this.timeList = this.timeList.filter(obj => {return obj !== f.value.time});
    // console.log(f.value.time)
    // console.log(this.timeList);
    // this.ELEMENT_DATA.push({time: "10:00", task: 'Кормление', location: 1});
  }

  onSubmit(f: NgForm) {
    console.log(f);
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
      this.taskList = ['', 'Уборка', 'Кормление'];
    }
    if (role == 'Medic') {
      this.taskList = ['', 'Лечение', 'Медосмотр'];
    }
    if (role == 'DinoTrainer') {
      this.taskList = ['', 'Тренировка', 'Осмотр'];
    }
    if (role == 'Driver') {
      this.taskList = ['', 'Доставка еды', 'Перевозка материалов'];
    }
    if (role == 'Hunter') {
      this.taskList = ['', 'Уборка', 'Кормление'];
    }
    this.dataSource = [];
    this.timeIndex = 0;
    this.currentTime = this.timeList[this.timeIndex];
  }

  sendSchedule() {
    console.log(this.dataSource);
  }
}

export interface Task {
  time: string;
  task: string;
  location: number;
}
