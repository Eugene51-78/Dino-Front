import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContentService} from './content.service';
import {NotificationsService} from 'angular2-notifications';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Employee} from './employee.interface';
import {initializeApp} from "firebase/app";
import {environment} from "../../environments/environment";
import {AuthService} from "../login/auth.service";
import {getMessaging, getToken, onMessage, deleteToken} from "firebase/messaging";
import {AppService} from '../app.service';
import {MomentumTask} from '../task/momentum-task.interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  employeeHasLoaded: boolean = false;

  employee!: Employee;

  hunterList!: Employee[];               // список доступных Хантеров, если задача в Gray статусе, иначе он пустой
  progressStatus: number | undefined; // статус Прогресса задачи, если задача в статусах Yellow, Green, Red, иначе он пустой
  currentHunterID!: number | null;     // текущий вызванный Хантер, если задача в стаутсах Yellow, Green, Red, иначе он пустой
  groupId!: number;
  momentumTask!: MomentumTask;
  interval: number | undefined;

  constructor(private modalService: NgbModal,
              public contentService: ContentService,
              private notificationService: NotificationsService,
              private auth: AuthService,
              public appService: AppService) {
    this.getEmployeeFromServer();
    this.progressStatus = 0;
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      const firebaseApp = initializeApp(environment.firebase);
      this.requestPermission(firebaseApp);
      this.listen(firebaseApp);
    }
    this.employee = this.contentService.getEmployee();
    this.contentService.setEmployee(this.employee);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  requestPermission(firebaseApp: any) {
    const messaging = getMessaging(firebaseApp);
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey}).then(
      (currentToken) => {
        if (currentToken) {
          // console.log("Hurraaa!!! we got the token.....");
          // console.log(currentToken);
          let token = {
            token: currentToken
          }
          this.contentService.setFbToken(currentToken);
          this.sendFireBaseToken(token);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  listen(firebaseApp: any) {
    const messaging = getMessaging(firebaseApp);
    // console.log("Receiving messages...")
    onMessage(messaging, (payload) => {
      // console.log('Message received. ', payload);
      this.notificationService.info(payload.notification?.title, payload.notification?.body)
      // this.message=payload;
      // const f = parseJson(payload.toString())
    });
  }

  getEmployeeFromServer() {
    this.contentService.getEmployeeFromServer().subscribe((res: any) => {
      if (res === null) {
        // console.log('res is null');
        return null;
      }
      this.employee = res;
      this.contentService.setEmployee(this.employee);
      this.employeeHasLoaded = true;
      return this.employee;
    }, (err: { message: any; }) => {
      // this.notificationService.error('Ошибка', 'Не удалось получить сведения об аккаунте!')
      return null;
    });
  }

  sendFireBaseToken(token: any) {
    this.contentService.sendFireBaseToken(token).subscribe((res) => {
      // console.log('Токен сохранен успешно');
    }, (err: { message: any; }) => {
      console.log('Ошибка', err);
      // this.notificationService.error('Ошибка получения токена');
      return null;
    });
  }

  openGuardModal(guardModal: any) {
    this.getCurrentTask();
    this.interval = setInterval(() => {this.getCurrentTask(); console.log('interval')}, 3000);
    this.modalService.open(guardModal).result
      .then((result) => {
        // console.log('Modal closed');
      })
      .catch(err => '');
  }

  onClose(modal: any) {
    modal.dismiss('Cross click');
    clearInterval(this.interval);
    this.interval = undefined;
  }

  onSubmit(f: NgForm) {
    const task = {
      "from": this.employee.id,
      "to": f.value.id,
      "type": 1,
      "status": 1,
      "comment": "Нужна охрана"
    };
    this.hunterRequest([task]);
    clearInterval(this.interval);
    this.interval = undefined;
    this.modalService.dismissAll();
  }

  private hunterRequest(task: any) {
    this.contentService.transportationRequest(task).subscribe(
      () => {
        this.notificationService.success("Успех", "Запрос отправлен Хантеру");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка отправки запроса Хантеру");
      }
    );
  }

  private getHunterList() {
    this.contentService.getHunterList().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      try {
        let ids = [];
        for (let i = 0; i < res.length; i++) {
          ids.push(res[i]['id']);
        }
        this.hunterList = ids;
      } catch (e) {
      }
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка доступных Хантеров')
    });
  }

  stopMomentumTask() {
    this.contentService.stopMomentumTask(this.momentumTask.id).subscribe(
      () => {
        this.getCurrentTask();
        this.progressStatus = 0;
        this.notificationService.success("Успех", "Вызов завершен успешно");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка завершения вызова");
      }
    );
  }

  private getCurrentTask() {
    this.contentService.getMomentumTask().subscribe((res: any) => {
      if (res === null) {
        this.currentHunterID = null;
        this.getHunterList();
        return;
      }
      if (res.length == 0) {
        this.currentHunterID = null;
        this.getHunterList();
        return;
      }
      this.hunterList = [];
      this.momentumTask = res[0];
      this.groupId = res[0].groupId;
      this.currentHunterID = this.momentumTask.to.id;
      this.progressStatus = this.momentumTask.status.id;
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      //this.notificationService.error('Ошибка получения текущей задачи')
    });
  }

  stopAllTasks() {
    this.contentService.stopAllTasks(this.groupId).subscribe((res: any) => {
      this.notificationService.success("Успех", "Вызов завершен успешно");
        this.getCurrentTask();
        this.progressStatus = 0;
    },
    error => {
      console.warn(error);
      this.notificationService.error("Ошибка", "Ошибка завершения вызова");
    }
  );
  }

  onCancelClick(modal: any) {
    modal.close('Cancel click');
    clearInterval(this.interval);
    this.interval = undefined;
  }
}

