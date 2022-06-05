import { Component, OnInit } from '@angular/core';
import {ContentService} from '../content/content.service';
import {NotificationsService} from 'angular2-notifications';
import {NotificationService} from './notification.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: any;
  columnsToDisplay = ['position', 'name', 'weight'];

  constructor(public notificationService: NotificationService, public notificationsService: NotificationsService) { }

  ngOnInit() {
    this.getNotifications();
    this.notifications = ELEMENT_DATA;
  }

  getNotifications() {  // flag for getData() call without rerender in NgOnInit()
    this.notificationService.getNotifications().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        //this.rerender();
        return;
      }
      this.notifications = res;
      console.log(this.notifications);
      //this.notificationService.success('Получено')
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationsService.error('Ошибка получения')
    });
  }
}
