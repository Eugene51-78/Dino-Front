import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {FormControl} from '@angular/forms';
import {NavigatorService} from './navigator.service';
import {NotificationsService} from 'angular2-notifications';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})

export class NavigatorComponent implements OnInit, OnDestroy {

  locationList!: any[];
  dinoList!: any[];
  medicList!: any[];
  dinoTrainerList!: any[];
  driverList!: any[];
  // progressStatus = {'medic': 0, 'dinoTrainer': 0,'driver': 0};
  interval: number | undefined;
  isRecomOn!: boolean;
  medic = {id: -1, taskId: -1, taskStatusId: 0};
  dinoTrainer = {id: -1, taskId: -1, taskStatusId: 0};
  driver = {id: -1, taskId: -1, taskStatusId: 0};
  groupId: any;
  flag = true;
  // private task: ({ from: number; comment: string; to: number; type: number; status: number } | { from: number; comment: string; to: number; type: number; status: number } | { from: number; comment: string; to: number; type: number; status: number })[];

  constructor(public appService: AppService,
              public navigatorService: NavigatorService,
              public notificationService: NotificationsService) {
    this.getCurrentTask();
  }

  ngOnInit(): void {
    this.getLocationList();
    this.interval = setInterval(() => {this.getCurrentTask(); console.log("запрос текущих задач")}, 3000);
    // this.isRecomOn = false;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  onSubmit(value: any) {
    console.log(value);
    const comment = "Локация: " + value.location + ", Дино ИД: " +  value.dino_id;
    // const comment = value.location + ", " +  value.dino_id;
    const task1 = {
      "from": this.appService.employee.id,
      "to": +value.medic_id,
      "type": 2,
      "status": 1,
      "comment": comment
    };
    const task2 = {
      "from": this.appService.employee.id,
      "to": +value.trainer_id,
      "type": 2,
      "status": 1,
      "comment": comment
    };
    const task3 = {
      "from": this.appService.employee.id,
      "to": +value.driver_id,
      "type": 2,
      "status": 1,
      "comment": comment
    };
    const task_init = [task1, task2, task3]
    // this.roleRequest(task1);
    // this.roleRequest(task2);
    // this.roleRequest(task3);
    this.transportationRequest(task_init);
    this.getCurrentTask();
  }

  private transportationRequest(task: any) {
    console.log(task);
    this.navigatorService.transportationRequest(task).subscribe(
      () => {
        this.notificationService.success("Успех", "Запрос отправлен");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка отправки запроса транспортировки");
      }
    );
  }

  private getCurrentTask() {
    this.navigatorService.getCurrentTask().subscribe((res: any) => {
      console.log(res);
      if (res.length == 0) {
        // задач нет
        // this.medic = {id: -1, taskId: -1, taskStatusId: -1};
        // this.dinoTrainer = {id: -1, taskId: -1, taskStatusId: -1};
        // this.driver = {id: -1, taskId: -1, taskStatusId: -1};
        if (this.flag) {
          this.getDinoList();
          this.getMedicList();
          this.getDinoTrainerList();
          this.getDriverList();
          this.flag = false;
        }
      } else {
        this.getDinoList();
        this.getDinoTrainerList();
        this.getDriverList();
        this.dinoTrainer = {id: 0, taskStatusId: 0, taskId: 0}
        // задачи есть
        console.log(res);
        this.groupId = res[0]['groupId'];
        console.log(this.groupId);
        // res = res['tasks']
        for (let i = 0; i < res.length; i++) {
          if (res[i]['to']['role']['name'] == "Medic") {
            this.medic.id = res[i]['to']['id'];
            this.medic.taskStatusId = res[i]['status']['id'];
            this.medic.taskId = res[i]['id'];
            this.medicList = [this.medic.id];
          }
          if (res[i]['to']['role']['name'] == "DinoTrainer") {
            this.dinoTrainer.id = res[i]['to']['id'];
            this.dinoTrainer.taskStatusId = res[i]['status']['id'];
            this.dinoTrainer.taskId = res[i]['id'];
            this.dinoTrainerList = [this.dinoTrainer.id];
          }
          if (res[i]['to']['role']['name'] == "Driver") {
            this.driver.id = res[i]['to']['id'];
            this.driver.taskStatusId = res[i]['status']['id'];
            this.driver.taskId = res[i]['id'];
            this.driverList = [this.driver.id];
          }

          console.log(this.medic);
          if (this.medic.id == 0) {
            console.log('hei');
            this.medic = {id: 0, taskId: 0, taskStatusId: 0};
            this.getMedicList();
          }
          if (this.dinoTrainer.id == 0) {
            this.dinoTrainer = {id: 0, taskId: 0, taskStatusId: 0};
            this.getDinoTrainerList();
          }
          if (this.driver.id == 0) {
            console.log('Hule')
            this.driver = {id: 0, taskId: 0, taskStatusId: 0};
            this.getDriverList();
          }
        }
      }
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      // this.notificationService.error('Ошибка получения текущей задачи транспортировки')
    });
  }

  private getLocationList() {
    this.navigatorService.getLocationList().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      try {
        let ids = [];
        for (let i = 0; i < res.length; i++) {
          ids.push(res[i]['name']);
        }
        this.locationList = ids;
      } catch (e) {
      }
      console.log(this.locationList);
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка локаций');
    });
  }

  private getDinoList() {
    this.navigatorService.getDinoList().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      try {
        let ids = [];
        for (let i = 0; i < res.length; i++) {
          ids.push(res[i]['id']);
        }
        this.dinoList = ids;
      } catch (e) {
      }
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка доступных Дино');
    });
  }

  private getMedicList() {
    this.navigatorService.getMedicList().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      try {
        let ids = [];
        for (let i = 0; i < res.length; i++) {
          ids.push(res[i]['id']);
        }
        this.medicList = ids;
      } catch (e) {
      }
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка доступных Медиков');
    });
  }
  private getDinoTrainerList() {
    this.navigatorService.getDinoTrainerList().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      try {
        let ids = [];
        for (let i = 0; i < res.length; i++) {
          ids.push(res[i]['id']);
        }
        this.dinoTrainerList = ids;
      } catch (e) {
      }
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка доступных Дрессировщиков');
    });
  }

  private getDriverList() {
    this.navigatorService.getDriverList().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      try {
        let ids = [];
        for (let i = 0; i < res.length; i++) {
          ids.push(res[i]['id']);
        }
        this.driverList = ids;
      } catch (e) {
      }
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка доступных Водителей')
    });
  }

  stopTransportations() {
    if (this.medic.taskStatusId == 4 || this.medic.taskStatusId == 2 || this.medic.taskStatusId == 1) {
      this.stopTransportation(this.medic.taskId);
    }
    if (this.dinoTrainer.taskStatusId == 4 || this.dinoTrainer.taskStatusId == 2 || this.dinoTrainer.taskStatusId == 1) {
      console.log('удаляем');
      this.stopTransportation(this.dinoTrainer.taskId);
    }
    if (this.driver.taskStatusId == 4 || this.driver.taskStatusId == 2 || this.driver.taskStatusId == 1) {
      this.stopTransportation(this.driver.taskId);
    }
  }

  resetSome(value: any) {
    const comment = "123"
    console.log(this.driver);
    if (this.medic.taskStatusId == 0) {
      const task = [{
        "from": this.appService.employee.id,
        "to": +value.medic_id,
        "type": 2,
        "comment": comment,
        "groupId": this.groupId
      }];
      this.transportationRequest(task);
    }
    if (this.dinoTrainer.taskStatusId == 0) {
      const task = [{
        "from": this.appService.employee.id,
        "to": +value.trainer_id,
        "type": 2,
        "comment": comment,
        "groupId": this.groupId
      }];
      this.transportationRequest(task);
    }
    if (this.driver.taskStatusId == 0) {
      const task = [{
        "from": this.appService.employee.id,
        "to": +value.driver_id,
        "type": 2,
        "comment": comment,
        "groupId": this.groupId
      }];
      console.log(task);
      this.transportationRequest(task);
    }
  }

  stopTransportation(taskId: number) {
    console.log('Stop transport')
    this.navigatorService.stopTransportation(taskId).subscribe(
      () => {
        this.medic.taskStatusId = 0;
        this.dinoTrainer.taskStatusId = 0;
        this.driver.taskStatusId = 0;
        // this.getCurrentTransportation();
        this.notificationService.success("Успех", "Транспортировка завершена успешно");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка завершения транспортировки");
      }
    );
  }

  switchRecommendation() {
    this.isRecomOn = !this.isRecomOn;
    // if (this.isRecomOn) {
    //   this.getRecommendations();
    // }
  }

  getRecommendations() {
    this.navigatorService.getRecommendations().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      // рекомендации как готовые
      console.log(res);
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка доступных Медиков')
    });
  }

  getRecommendationDino(location: number) {
    if (this.isRecomOn) {
      console.log(location);
      //   обновить список дино, указав реки
    }
  }
}
