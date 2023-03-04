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
  location!: string;
  groupId: any;
  initFlag = true;
  medicResetFlag = true;
  dinoTrainerResetFlag = true;
  driverResetFlag = true;
  shows = ['Шоу-Арена', 'Шоу-Поляна'];
  comment!: string;

  constructor(public appService: AppService,
              public navigatorService: NavigatorService,
              public notificationService: NotificationsService) {
    this.appService.setEmployeeFromServer();
    this.getCurrentTask();
  }

  ngOnInit(): void {
    this.getLocationList();
    this.interval = setInterval(() => {this.getCurrentTask(); console.log("запрос текущих задач")}, 3000);
    this.isRecomOn = true;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  onSubmit(value: any) {
    console.log(this.appService.employee.id);
    const rExp : RegExp = /\d+/g;
    let dino_id = +value.dino_id.match(rExp);
    console.log("Дино ИД: " +  dino_id);
    const comment = "Локация: " + value.location + ", Дино ИД: " +  dino_id;
    this.comment = comment;
    const taskMedic = {
      "from": this.appService.employee.id,
      "to": +value.medic_id,
      "type": 2,
      "status": 1,
      "comment": comment
    };
    const taskTrainer = {
      "from": this.appService.employee.id,
      "to": +value.trainer_id,
      "type": 2,
      "status": 1,
      "comment": comment
    };
    const taskDriver = {
      "from": this.appService.employee.id,
      "to": +value.driver_id,
      "type": 2,
      "status": 1,
      "comment": comment
    };
    const taskInit = [taskMedic, taskTrainer, taskDriver]
    this.transportationRequest(taskInit);
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
        // this.getDinoList();
        // задач нет
        // this.medic = {id: -1, taskId: -1, taskStatusId: -1};
        // this.dinoTrainer = {id: -1, taskId: -1, taskStatusId: -1};
        // this.driver = {id: -1, taskId: -1, taskStatusId: -1};
        if (this.initFlag) {
          // this.getDinoList();
          this.getDinoList();
          this.getMedicList();
          this.getDinoTrainerList();
          this.getDriverList();
          this.initFlag = false;
        }
      } else {
        // this.getDinoList();
        // this.getDinoTrainerList();
        // this.getDriverList();
        // задачи есть
        this.groupId = res[0]['groupId'];
        this.comment = res[0]['comment'];
        // res = res['tasks']
        for (let i = 0; i < res.length; i++) {
          if (res[i]['to']['role']['name'] == "Medic") {
            if (this.medic.taskStatusId != 4) {
              this.medic.id = res[i]['to']['id'];
            }
            this.medic.taskStatusId = res[i]['status']['id'];
            this.medic.taskId = res[i]['id'];
            // if (this.medicResetFlag) {
            //   console.log(this.medic.taskStatusId);
              if (res[i]['status']['id'] == 4) {
                console.log('update medics');
                // this.medic = {id: 0, taskId: 0, taskStatusId: 0};
                this.getMedicList();
                // this.medicList = this.medicList.filter(obj => [return obj !== res[i]['to']['id']]);
              }
              //this.medicResetFlag = false;
            // }
            if (this.medic.taskStatusId != 4) {
              this.medicList = [this.medic.id];
            }
          }
          if (res[i]['to']['role']['name'] == "DinoTrainer") {
            if (this.dinoTrainer.taskStatusId != 4) {
              this.dinoTrainer.id = res[i]['to']['id'];
            }
            this.dinoTrainer.taskStatusId = res[i]['status']['id'];
            this.dinoTrainer.taskId = res[i]['id'];
            if (this.dinoTrainer.taskStatusId != 4) {
              this.dinoTrainerList = [this.dinoTrainer.id];
            }
            //if (this.dinoTrainerResetFlag) {
              if (res[i]['status']['id'] == 4) {
                // this.medic = {id: 0, taskId: 0, taskStatusId: 0};
                this.getDinoTrainerList();
              }
              //this.dinoTrainerResetFlag = false;
            }
         // }
          if (res[i]['to']['role']['name'] == "Driver") {
            if (this.driver.taskStatusId != 4) {
              this.driver.id = res[i]['to']['id'];
            }
            this.driver.taskStatusId = res[i]['status']['id'];
            this.driver.taskId = res[i]['id'];
            if (this.driver.taskStatusId != 4) {
              this.driverList = [this.driver.id];
            }
            //if (this.driverResetFlag) {
              if (res[i]['status']['id'] == 4) {
                // this.medic = {id: 0, taskId: 0, taskStatusId: 0};
                console.log('hefa')
                this.getDriverList();
              }
              //this.driverResetFlag = false;
            //}
          }

          if (this.medic.id == 0) {
            this.medic = {id: 0, taskId: 0, taskStatusId: 0};
            this.getMedicList();
          }
          if (this.dinoTrainer.id == 0) {
            this.dinoTrainer = {id: 0, taskId: 0, taskStatusId: 0};
            this.getDinoTrainerList();
          }
          if (this.driver.id == 0) {
            this.driver = {id: 0, taskId: 0, taskStatusId: 0};
            this.getDriverList();
          }

          // if (this.resetFlag) {
          //
          //   console.log(this.medic)
          //   if (this.medic.taskStatusId == 4) {
          //     console.log('hello')
          //     // this.medic = {id: 0, taskId: 0, taskStatusId: 0};
          //     this.getMedicList();
          //   }
          //   if (this.dinoTrainer.taskStatusId == 4) {
          //     // this.dinoTrainer = {id: 0, taskId: 0, taskStatusId: 0};
          //     this.getDinoTrainerList();
          //   }
          //   if (this.driver.taskStatusId == 4) {
          //     // this.driver = {id: 0, taskId: 0, taskStatusId: 0};
          //     this.getDriverList();
          //   }
          //   this.resetFlag = false;
          // }
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
    console.log(this.driver);
    if (this.medic.taskStatusId == 4) {
      const task = [{
        "from": this.appService.employee.id,
        "to": +value.medic_id,
        "type": 2,
        "comment": this.comment,
        "groupId": this.groupId
      }];
      this.transportationRequest(task);
    }
    if (this.dinoTrainer.taskStatusId == 4) {
      const task = [{
        "from": this.appService.employee.id,
        "to": +value.trainer_id,
        "type": 2,
        "comment": this.comment,
        "groupId": this.groupId
      }];
      this.transportationRequest(task);
    }
    if (this.driver.taskStatusId == 4) {
      const task = [{
        "from": this.appService.employee.id,
        "to": +value.driver_id,
        "type": 2,
        "comment": this.comment,
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

  getRecommendations(location: string) {
    console.log(location);
    this.location = location;
    if (this.shows.includes(location)) {
      this.navigatorService.getRecommendations().subscribe((res: any) => {
        if (res === null) {
          console.log('res is null');
          return;
        }
        console.log(res);
        this.dinoList = [];
        try {
          let ids = [];
          for (let i = 0; i < res.length; i++) {
            ids.push(res[i]['id']);
          }
          this.dinoList = ids;
          console.log(this.dinoList);
        } catch (e) {
        }
        for (let i = 0; i < res.length; i++) {
          if (res[i]['isRecommend']) {
            this.dinoList.splice(this.dinoList.indexOf(res[i].id), 1, res[i].id + ' (рекомендуется)');
          }
        }
      }, (err: { message: any; }) => {
        console.log('Ошибка', err.message);
        this.notificationService.error('Ошибка запроса рекомендаций')
      });
    } else
      this.getDinoList();
  }

  endTransportation() {
    this.navigatorService.endTransportation(this.groupId).subscribe(
      () => {
        // this.medic = {id: -1, taskId: -1, taskStatusId: 0};
        // this.dinoTrainer = {id: -1, taskId: -1, taskStatusId: 0};
        // this.driver = {id: -1, taskId: -1, taskStatusId: 0};
        // this.getCurrentTransportation();
        this.initFlag = true;
        this.medicResetFlag = true;
        this.dinoTrainerResetFlag = true;
        this.driverResetFlag = true;
        this.notificationService.success("Успех", "Транспортировка завершена успешно");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка завершения транспортировки");
      }
    );
  }

  stopAllTasks() {
    this.navigatorService.stopAllTasks(this.groupId).subscribe(
      () => {
        this.medic = {id: -1, taskId: -1, taskStatusId: 0};
        this.dinoTrainer = {id: -1, taskId: -1, taskStatusId: 0};
        this.driver = {id: -1, taskId: -1, taskStatusId: 0};
        this.initFlag = true;
        this.medicResetFlag = true;
        this.dinoTrainerResetFlag = true;
        this.driverResetFlag = true;
        // this.getCurrentTransportation();
        this.notificationService.success("Успех", "Транспортировка завершена успешно");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка завершения транспортировки");
      }
    );
  }
}
