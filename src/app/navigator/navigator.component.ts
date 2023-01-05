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

  model = {name: 'Karl'}

  submitted = false;
  medicList = [1, 2, 3]
  dinoTrainerList = [1, 2, 3]
  driverList = [1, 2, 3]
  medicControl!: FormControl;
  private progressStatus: any;
  private Transportation: any;
  private currentMedicID: any;
  // private currentDinoTrainerID: any;
  // private currentDriverID: any;

  constructor(public appService: AppService,
              public navigatorService: NavigatorService,
              public notificationService: NotificationsService) {
  }

  ngOnInit(): void {
    this.getCurrentTransportation();
  }

  onSubmit(naviForm: any) {
    console.log(naviForm);
    this.submitted = true;
  }

  private getCurrentTransportation() {
    this.navigatorService.getTransportTask().subscribe((res: any) => {
      if (res === null) {
        this.currentMedicID = null;
        this.getMedicList();
        // this.currentDinoTrainerID = null;
        // this.getDinoTrainerList();
        // this.currentDriverID = null;
        // this.getDriverList();
        return;
      }
      this.medicList = [];
      this.Transportation = res;
      this.currentMedicID = this.Transportation.medic.id; // нужна такая структура в ответе
      this.progressStatus = this.Transportation.status; // статусы всех в одной переменной
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      //this.notificationService.error('Ошибка получения текущей задачи')
    });
  }

  private getMedicList() {
    this.navigatorService.getMedicList().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      console.log(res);
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
      this.notificationService.error('Ошибка получения списка доступных Медиков')
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
        this.getCurrentTransportation();
        this.progressStatus = 0;
        this.notificationService.success("Успех", "Транспортировка завершен успешно");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка завершения транспортировки");
      }
    );
  }

}
