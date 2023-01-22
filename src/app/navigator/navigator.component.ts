import { Component, OnInit } from '@angular/core';
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

export class NavigatorComponent implements OnInit {

  locationList = [1, 4, 10];
  dinoList = [1, 2, 5];
  medicList = [1, 2, 3];
  dinoTrainerList = [1, 2, 3];
  driverList = [1, 2, 3];
  progressStatus = {'medic': 0, 'dinoTrainer': 0,'driver': 0};
  interval: number | undefined;
  transportation: any;
  currentDinoTrainerID: any;
  currentDriverID: any;
  isRecomOn!: boolean;
  medic = {id: 0, taskId: 0, taskStatusId: 0};
  dinoTrainer = {id: 0, taskId: 0, taskStatusId: 0};
  driver = {id: 0, taskId: 0, taskStatusId: 0};

  constructor(public appService: AppService,
              public navigatorService: NavigatorService,
              public notificationService: NotificationsService) {
    this.getCurrentTask();
  }

  ngOnInit(): void {

    this.interval = setInterval(() => {this.getCurrentTask(); console.log("запрос текущих задач")}, 5000);
    // this.getCurrentTransportation();
    // this.isRecomOn = false;
  }

  onSubmit(value: any) {
    console.log(value);
    const comment = "Локация: " + value.location + ", Дино ИД: " +  value.dino_id;
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
    this.roleRequest(task1);
    this.roleRequest(task2);
    this.roleRequest(task3);
    this.getCurrentTask();
  }

  private roleRequest(task: any) {
    console.log(task);
    this.navigatorService.roleRequest(task).subscribe(
      () => {
        this.notificationService.success("Успех", "Запрос отправлен");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка отправки запроса Хантеру");
      }
    );
  }

  private getCurrentTask() {
    this.navigatorService.getMomentumTask().subscribe((res: any) => {
      if (res.length == 0) {
        // задач нет
        this.getLocationList();
        // this.currentMedicID = "";
        this.getMedicList();
        this.currentDinoTrainerID = "";
        this.getDinoTrainerList();
        this.currentDriverID = "";
        this.getDriverList();
        console.log(res);
        return;
      }
      // задачи есть
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        if (res[i]['to']['role']['name'] == "Medic") {
          this.medic.id = res[i]['to']['id'];
          this.medic.taskStatusId = res[i]['status']['id'];
          this.medic.taskId = res[i]['id'];
          console.log(this.medic);
        }
        if (res[i]['to']['role']['name'] == "DinoTrainer") {
          this.dinoTrainer.id = res[i]['to']['id'];
          this.dinoTrainer.taskStatusId = res[i]['status']['id'];
          this.dinoTrainer.taskId = res[i]['id'];
          console.log(this.dinoTrainer);
        }
        if (res[i]['to']['role']['name'] == "Driver") {
          this.driver.id = res[i]['to']['id'];
          this.driver.taskStatusId = res[i]['status']['id'];
          this.driver.taskId = res[i]['id'];
          console.log(this.driver);
        }
      }
      // this.currentMedicID = res.
      // this.medicList = [];
      // this.getLocationList();
      // this.getDinoList();
      // this.getMedicList();
      // this.getDinoTrainerList();
      // this.getDriverList();
      // this.currentMedicID = this.medicTask.to.id;
      // this.progressStatus = this.medicTask.status.id;
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      //this.notificationService.error('Ошибка получения текущей задачи')
    });
  }

  private getCurrentTransportation() {
    this.navigatorService.getTransportTask().subscribe((res: any) => {
      if (res === null) {
        // this.progressStatus = {'medic': 1, 'dinoTrainer': 2, 'driver': 3};
        // this.currentMedicID = null;
        this.getMedicList();
        this.currentDinoTrainerID = null;
        this.getDinoTrainerList();
        this.currentDriverID = null;
        this.getDriverList();
        return;
      }
      // this.medicList = [];
      this.transportation = res;
      // this.currentMedicID = this.Transportation.medic.id; // нужна такая структура в ответе
      this.progressStatus = this.transportation.status; // статусы всех в одном поле
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.getLocationList();
      this.getDinoList();
      this.getMedicList();
      this.getDinoTrainerList();
      this.getDriverList();
      this.notificationService.error('Ошибка получения текущей задачи');
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

  private transportationRequest(value: any) {
    const task = {
      "from": this.appService.employee.id,
      "to": value.id,
      "type": 1,
      "status": 1,
      "comment": "test"
    };
    this.navigatorService.transportationRequest(task).subscribe(
      () => {
        this.notificationService.success("Успех", "Транспортировка назначена");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка отправки запроса на транспортировку");
      }
    );
  }

  stopTransportation() {
    this.navigatorService.stopTransportation(this.medic.taskId).subscribe(
      () => {
        this.progressStatus.medic = 0;
        this.progressStatus.dinoTrainer = 0;
        this.progressStatus.driver = 0;
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
