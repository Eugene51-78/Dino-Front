import { Component, OnInit } from '@angular/core';
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
import {Alarm} from '../alarm/alarm.interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  employee!: Employee;

  hunterList: number[];
  progressStatus: number | undefined;
  currentHunterID: number | null;

  constructor(private modalService: NgbModal, public contentService: ContentService, private notificationService: NotificationsService, private auth: AuthService, public appService: AppService) {
    this.employee = contentService.getEmployee();
    //this.employee.role = 'Medic';
    //this.employee.role = 'Manager';
    //this.employee.role = 'Hunter';
    this.contentService.setEmployee(this.employee);

    this.hunterList = [1, 11, 12];
    this.progressStatus = 0;
    this.currentHunterID = null;
  }

  ngOnInit() {
    //this.employeeType = this.contentService.getEmployeeRole();
    //this.isAlarmOn = this.contentService.getIsAlarmOn();
    if (this.auth.isAuthenticated()) {
      const firebaseApp = initializeApp(environment.firebase);
      this.requestPermission(firebaseApp);
      this.listen(firebaseApp);
    }
    this.getEmployeeFromServer();
    //this.initAlarm();
  }

  requestPermission(firebaseApp: any) {
    const messaging = getMessaging(firebaseApp);
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey}).then(
      (currentToken) => {
        if (currentToken) {
          console.log("Hurraaa!!! we got the token.....");
          console.log(currentToken);
          let token = {
            token: currentToken
          }
          console.log()
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
    console.log("Receiving messages...")
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.notificationService.info(payload.notification?.title, payload.notification?.body)
      // this.message=payload;
      // const f = parseJson(payload.toString())
    });
  }

  getEmployeeFromServer() {  // flag for getData() call without rerender in NgOnInit()
    this.contentService.getEmployeeFromServer().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return null;
      }
      this.employee = res;
      this.contentService.setEmployee(this.employee);
      console.log(this.employee);
      return this.employee;
      //this.notificationService.success('Получено')
    }, (err: { message: any; }) => {
      console.log('Ошибка', err);
      // this.notificationService.error('Ошибка получения')
      return null;
    });
  }

  // getAlarmFromServer() {  // flag for getData() call without rerender in NgOnInit()
  //   this.contentService.getAlarmFromServer().subscribe((res: any) => {
  //     if (res === null) {
  //       console.log('res is null');
  //       //this.rerender();
  //       return;
  //     }
  //     this.alarm = res;
  //     if (this.alarm.isOn) {
  //       localStorage.setItem('alarm', 'true');
  //     } else {
  //       localStorage.setItem('alarm', 'false');
  //     }
  //     this.contentService.setAlarm(this.alarm);
  //     console.log(this.alarm);
  //     //this.notificationService.success('Получено')
  //   }, (err: { message: any; }) => {
  //     console.log('Ошибка', err.message);
  //     this.notificationService.error('Ошибка получения тревоги')
  //   });
  // }

  sendFireBaseToken(token: any) {
    this.contentService.sendFireBaseToken(token).subscribe((res) => {
      console.log('Токен сохранен успешно');
    }, (err: { message: any; }) => {
      console.log('Ошибка', err);
      // this.notificationService.error('Ошибка получения')
      return null;
    });
  }

  openGuardModal(guardModal: any) {
    console.log(guardModal);
    this.getHunterList();
    this.getCurrentHunterID();
    // Get there current Hunter ID
    // else If none than get list of available Hunters

    this.modalService.open(guardModal).result
      .then((result) => console.log('Modal closed'))
      .catch(err => '');
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    if (this.currentHunterID === null) {
      this.postHunterRequest(f.value);
    }
    this.modalService.dismissAll(); //dismiss the modal
    this.progressStatus = 1;
  }

  private postHunterRequest(id: number) {
    this.contentService.postHunterRequest(id).subscribe(
      () => {
        console.log("login success");
        this.notificationService.success("Успех", "");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка отправки запроса");
      }
    );
  }

  private getHunterList() {
    this.contentService.getHunterList().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      this.hunterList = res;
      console.log(this.hunterList);
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка доступных Хантеров')
    });
  }

  private getCurrentHunterID() {
    this.contentService.getCurrentHunterID().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      this.currentHunterID = res;
      console.log(this.currentHunterID);
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения вызванного Хантера')
    });
  }
}
