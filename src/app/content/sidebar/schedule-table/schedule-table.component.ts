import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})

export class ScheduleTableComponent implements OnInit {

  TASK_DATA: Task[] = [
    {time: "10:00", task: 'Кормление', location: 1},
    // {time: "12:00", task: 'Уборка', location: 2},
    // {time: "14:00", task: 'Кормление', location: 3},
    // {time: "15:00", task: 'Уборка', location: 4},
    // {time: "16:00", task: 'Кормление', location: 5},
  ];

  employeeList = [1, 2, 3]
  displayedColumns = ['Время', 'Задача', 'Локация'];
  dataSource = this.TASK_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  addRow(f: NgForm) {
    const newRow = {time: "10:00", task: 'Кормление', location: 1};
    this.dataSource = [...this.TASK_DATA, newRow];
    // this.ELEMENT_DATA.push({time: "10:00", task: 'Кормление', location: 1});
  }

  onSubmit(f: NgForm) {
    console.log(f);
  }

  removeRow() {
    // this.dataSource = this.dataSource.filter((u) => u.time !== element.time);
    this.dataSource = this.dataSource.splice(0,this.dataSource.length-1)
  }
}

export interface Task {
  time: string;
  task: string;
  location: number;
}
