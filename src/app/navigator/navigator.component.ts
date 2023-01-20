import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {FormControl} from '@angular/forms';
import {NavigatorService} from './navigator.service';
import {NotificationsService} from 'angular2-notifications';

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
  Transportation: any;
  currentMedicID: any;
  currentDinoTrainerID: any;
  currentDriverID: any;
  isRecomOn!: boolean;

  constructor(public appService: AppService,
              public navigatorService: NavigatorService,
              public notificationService: NotificationsService) {
  }

  ngOnInit(): void {
    this.getCurrentTransportation();
    this.isRecomOn = false;
  }

  onSubmit(naviForm: any) {
    console.log(naviForm);
    this.transportationRequest(naviForm);
  }

  private getCurrentTransportation() {
    this.navigatorService.getTransportTask().subscribe((res: any) => {
      if (res === null) {
        // this.progressStatus = {'medic': 1, 'dinoTrainer': 2, 'driver': 3};
        this.currentMedicID = null;
        this.getMedicList();
        this.currentDinoTrainerID = null;
        this.getDinoTrainerList();
        this.currentDriverID = null;
        this.getDriverList();
        return;
      }
      // this.medicList = [];
      this.Transportation = res;
      this.currentMedicID = this.Transportation.medic.id; // нужна такая структура в ответе
      this.progressStatus = this.Transportation.status; // статусы всех в одном поле
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
        console.log(res);
        let ids = [];
        for (let i = 0; i < res.length; i++) {
          console.log(res[i]['id']);
          ids.push(res[i]['id']);
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
        console.log(res);
        let ids = [];
        for (let i = 0; i < res.length; i++) {
          console.log(res[i]['id']);
          ids.push(res[i]['id']);
        }
        this.dinoList = ids;
      } catch (e) {
      }
      console.log(this.medicList);
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
        console.log(res);
        let ids = [];
        for (let i = 0; i < res.length; i++) {
          console.log(res[i]['id']);
          ids.push(res[i]['id']);
        }
        this.medicList = ids;
      } catch (e) {
      }
      console.log(this.medicList);
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
        console.log(res);
        let ids = [];
        for (let i = 0; i < res.length; i++) {
          console.log(res[i]['id']);
          ids.push(res[i]['id']);
        }
        this.dinoTrainerList = ids;
      } catch (e) {
      }
      console.log(this.dinoTrainerList);
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
        console.log(res);
        let ids = [];
        for (let i = 0; i < res.length; i++) {
          console.log(res[i]['id']);
          ids.push(res[i]['id']);
        }
        this.driverList = ids;
      } catch (e) {
      }
      console.log(this.driverList);
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка доступных Водителей')
    });
  }

  private transportationRequest(task: any) {
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
    this.navigatorService.stopTransportation(this.Transportation.id).subscribe(
      () => {
        this.progressStatus.medic = 0;
        this.progressStatus.dinoTrainer = 0;
        this.progressStatus.driver = 0;
        this.getCurrentTransportation();
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
