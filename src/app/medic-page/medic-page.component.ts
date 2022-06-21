import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {Alarm} from '../alarm/alarm.interface';
import {AppService} from '../app.service';


@Component({
  selector: 'app-medic-page',
  templateUrl: './medic-page.component.html',
  styleUrls: ['./medic-page.component.css']
})
export class MedicPageComponent implements OnInit {

  currentOperation: any;

  constructor(private modalService: NgbModal, private notificationService: NotificationsService, public appService: AppService) {

  }

  ngOnInit() {

  }

  openMultiModal(multiModal: any, type: any) {
    if (type === 1) {
      this.currentOperation = 'Отчет о медосмотре';
    }
    else {
        this.currentOperation = 'Направление дино на лечение';
    }
    console.log(multiModal)
    this.modalService.open(multiModal).result
      .then((result) => console.log('Modal closed'))
      .catch(err => '');
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    // const url = 'http://localhost:8888/friends/addnew';
    // this.httpClient.post(url, f.value)
    //   .subscribe((result) => {
    //     this.ngOnInit(); //reload the table
    //   });
    this.modalService.dismissAll(); //dismiss the modal
    this.notificationService.success("Успех", "Все хорошо");
    this.notificationService.info("Инфо", "Такого нет");
    this.notificationService.error("Ошибка", "Не удалось что-то");
  }

}
