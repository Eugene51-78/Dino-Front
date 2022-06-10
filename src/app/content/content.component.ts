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
  employeeType: string | undefined;
  isAlarmOn: boolean;
  alarmType: string | undefined;

  hunterList: number[];
  progressStatus: number | undefined;
  currentHunter: any;

  constructor(private modalService: NgbModal, public contentService: ContentService, private notificationService: NotificationsService) {
    this.employeeType = 'Medic';
    //this.employeeType = 'Manager';
    //this.employeeType = 'Hunter';
    this.hunterList = [1, 11, 12];
    this.progressStatus = 0;
    this.currentHunter = 10;

    this.contentService.setEmployeeRole(this.employeeType.toString());
    this.employeeType = this.contentService.getEmployeeRole();
    if (localStorage.getItem('alarm') === 'true') {
      this.isAlarmOn = true;
      this.contentService.setIsAlarmOn(true);
      console.log('hello true');
    } else {
        console.log(localStorage.getItem('alarm'));
        localStorage.setItem('alarm', 'false');
        this.isAlarmOn = false;
    }
    this.alarmType = this.contentService.getAlarmType();
    console.log(this.alarmType);
  }

  ngOnInit() {
    //this.employeeType = this.contentService.getEmployeeRole();
    //this.isAlarmOn = this.contentService.getIsAlarmOn();
    this.getEmployee();
  }

  getEmployee() {  // flag for getData() call without rerender in NgOnInit()
    this.contentService.getEmployee().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        //this.rerender();
        return;
      }
      this.employeeType = res;
      console.log(this.employeeType);
      //this.notificationService.success('Получено')
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения')
    });
  }

  openGuardModal(guardModal: any) {
    console.log(guardModal);

    // Get there current Hunter ID
    // else If none than get list of available Hunters

    this.modalService.open(guardModal).result
      .then((result) => console.log('Modal closed'))
      .catch(err => '');
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    // send post request to Backend
    // const url = 'http://localhost:8080/hunter';
    // this.httpClient.post(url, f.value)
    //   .subscribe((result) => {
    //     this.ngOnInit(); //reload the table
    //   });
    this.modalService.dismissAll(); //dismiss the modal
    this.progressStatus = 1;
    this.notificationService.success("Успех", "Все нормас");
    this.notificationService.info("Инфо", "Такого нет");
    this.notificationService.error("Ошибка", "Не удалось что-то");
  }
}
