import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {AppService} from '../app.service';
import {MedicPageService} from './medic-page.service';
import {ContentService} from '../content/content.service';
import {Employee} from '../content/employee.interface';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-medic-page',
  templateUrl: './medic-page.component.html',
  styleUrls: ['./medic-page.component.css']
})
export class MedicPageComponent implements OnInit {

  currentOperation: any;
  dinoList!: number[];

  constructor(private modalService: NgbModal,
              private notificationService: NotificationsService,
              private medicPageService: MedicPageService,
              public appService: AppService) {
    this.appService.setEmployeeFromServer();
  }

  ngOnInit() {

  }

  openMultiModal(multiModal: any, type: any) {
    this.getDinoList();
    if (type === 1) {
      this.currentOperation = 'Отчет о медосмотре';
    }
    else {
        this.currentOperation = 'Направление дино на лечение';
    }
    this.modalService.open(multiModal).result
      .then((result) => console.log('Modal closed'))
      .catch(err => '');
  }

  onSubmit(f: NgForm) {
    if (this.currentOperation === 'Отчет о медосмотре') {
      this.sendReport(f.value);
    }
    else {
      this.sendRequestUnhealthy(f.value.id);
    }
    this.modalService.dismissAll(); //dismiss the modal
  }

  getDinoList() {
    this.medicPageService.getDinoList().subscribe((res: any) => {
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
      //console.log(this.dinoList);
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationService.error('Ошибка получения списка доступных Хантеров')
    });
  }

  sendReport(form: any) {
    form = {  dinoId: form.id,
              age: form.age,
              isHealthy: true,
              height: form.height,
              weight: form.weight};
    //console.log(form);
    this.medicPageService.sendReport(form).subscribe((res) => {
      this.notificationService.success('Успех', 'Информация о медосмотре дино отправлена')
    }, (err: { message: any; }) => {
      console.log('Ошибка', err);
      this.notificationService.error('Ошибка отправки отчета')
      return null;
    });
  }

  sendRequestUnhealthy(id: number) {
    this.medicPageService.sendRequestUnhealthy(id).subscribe((res) => {
      this.notificationService.success('Успех','Информация о заболевании дино отправлена')
    }, (err: { message: any; }) => {
      console.log('Ошибка', err);
      this.notificationService.error('Ошибка отправки информации о заболевании')
      return null;
    });
  }
}
