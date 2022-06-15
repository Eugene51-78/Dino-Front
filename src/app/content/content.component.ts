import { Component, OnInit } from '@angular/core';
import {ContentService} from './content.service';
import {NotificationsService} from 'angular2-notifications';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  alarm!: {isOn: boolean, type:string};
  employee!: {"id": number, email: string, firstName: string,
    secondName: string, middleName: string, role: { id: number, name: string },
    age: number, location:{"id": number, name: string, longitude: number, latitude: number},
    isBusy: boolean};

  hunterList: number[];
  progressStatus: number | undefined;
  currentHunterID: number | null;

  constructor(private modalService: NgbModal, public contentService: ContentService, private notificationService: NotificationsService) {

    this.employee = contentService.getEmployee();
    //this.employee.role = 'Medic';
    //this.employee.role = 'Manager';
    //this.employee.role = 'Hunter';
    this.contentService.setEmployee(this.employee);


    this.alarm = contentService.getAlarm();

    this.hunterList = [1, 11, 12];
    this.progressStatus = 0;
    this.currentHunterID = null;
  }

  ngOnInit() {
    //this.employeeType = this.contentService.getEmployeeRole();
    //this.isAlarmOn = this.contentService.getIsAlarmOn();
    this.getEmployeeFromServer();
    this.initAlarm();
    this.getAlarmFromServer();
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
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения')
      return null;
    });
  }

  getAlarmFromServer() {  // flag for getData() call without rerender in NgOnInit()
    this.contentService.getAlarmFromServer().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        //this.rerender();
        return;
      }
      this.alarm = res;
      if (this.alarm.isOn) {
        localStorage.setItem('alarm', 'true');
      } else {
        localStorage.setItem('alarm', 'false');
      }
      this.contentService.setAlarm(this.alarm);
      console.log(this.alarm);
      //this.notificationService.success('Получено')
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения тревоги')
    });
  }

  initAlarm(){
    if (localStorage.getItem('alarm') === 'true') {
      this.alarm.isOn = true;
      if (localStorage.getItem('alarmType')) {
        this.alarm.type = localStorage.getItem('alarmType')!;
      }
    } else {
      localStorage.setItem('alarm', 'false');
      this.alarm.isOn = false;
    }
    this.contentService.setAlarm(this.alarm);
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
