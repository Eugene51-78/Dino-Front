import { Component, OnInit } from '@angular/core';
import {MomentumTask} from './momentum-task.interface';
import {TaskService} from './task.service';
import {NotificationsService} from 'angular2-notifications';
import {AppService} from '../app.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  momentumTask!: MomentumTask;

  constructor(private taskService: TaskService, private notificationService: NotificationsService, public appService: AppService) {
  }

  ngOnInit(): void {
    this.getMomentumTask();
  }

  getMomentumTask() {
    this.taskService.getMomentumTask().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      this.momentumTask = res;
      console.log(this.momentumTask);
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения');
    });
  }

  hasMomentum() {
    // Если у пользователя есть моментальная задача,
    // то он не может получить другие моментальные задачи до разрешения текущей.
    return !!this.momentumTask;
  }

  acceptMomentumTask() {
    this.taskService.acceptMomentumTask(this.momentumTask.id).subscribe((res: any) => {
      console.log(res);
      this.notificationService.success('Задача подтверждена!');
      // Изменить состояние задачи и приложения или бэк сам все сделает
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка подтверждения задачи')
    });
  }

  refuseMomentumTask() {
    this.taskService.refuseMomentumTask(this.momentumTask.id).subscribe((res: any) => {
      console.log(res);
      this.notificationService.warn('Вы отказались от задачи!')
      // Изменить состояние задачи и приложения
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка отказа от задачи')
    });
  }
}
