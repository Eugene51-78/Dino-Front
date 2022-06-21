import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {NotificationService} from './notification.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AppService} from '../app.service';

export interface PeriodicElement {
  id: number;
  from: string;
  message: number;
  symbol: string;
}

export interface Notification {
  id: number;
  from: string;
  message: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, from: 'Hydrogen', message: 1.0079, symbol: 'H'},
  {id: 2, from: 'Helium', message: 4.0026, symbol: 'He'},
  {id: 3, from: 'Lithium', message: 6.941, symbol: 'Li'},
  {id: 4, from: 'Beryllium', message: 9.0122, symbol: 'Be'},
  {id: 5, from: 'Boron', message: 10.811, symbol: 'B'},
  {id: 6, from: 'Carbon', message: 12.0107, symbol: 'C'},
  {id: 7, from: 'Nitrogen', message: 14.0067, symbol: 'N'},
  {id: 8, from: 'Oxygen', message: 15.9994, symbol: 'O'},
  {id: 9, from: 'Fluorine', message: 18.9984, symbol: 'F'},
  {id: 10, from: 'Neon', message: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  notifications!: Notification[];
  columnsToDisplay = ['id', 'from', 'message'];
  dataSource: any;

  constructor(public notificationService: NotificationService, public notificationsService: NotificationsService, public appService: AppService) { }

  ngOnInit() {
    this.getNotifications();
    this.notifications = [{id: 1, from: 'Hydrogen', message: 'Hydrogen'},
                          {id: 2, from: 'Helium', message: 'Hydrogen'},
                          {id: 3, from: 'Lithium', message: 'Hello'}];
    this.dataSource = new MatTableDataSource<Notification>(this.notifications);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      this.notifications = res; // получаем массив уведомлений
      console.log(this.notifications);
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationsService.error('Ошибка получения')
    });
  }
}
