import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {NotificationService} from './notification.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AppService} from '../app.service';
import {Employee} from '../content/employee.interface';
import {ContentService} from '../content/content.service';

export interface PeriodicElement {
  id: number;
  from: string;
  message: number;
  symbol: string;
}

export interface Notification {
  id: number | undefined;
  header: string | undefined;
  body: string | undefined;
  user: Employee | undefined;
  imageUrl: string | undefined;
  isSend: boolean | undefined;
  isAlert: boolean | undefined;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  notifications!: Notification[];
  columnsToDisplay = ['id', 'header', 'body'];
  dataSource: any;

  constructor(public notificationService: NotificationService, public notificationsService: NotificationsService, public appService: AppService) {
    appService.setEmployeeFromServer();
  }

  ngOnInit() {
    this.getNotifications();
    this.dataSource = new MatTableDataSource<Notification>(this.notifications);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    // this.paginator = this.dataSource.paginator
  }


  getNotifications() {
    this.notificationService.getNotifications().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      // for (let i = 0; i < res.length; i++) {
      //   this.notifications.push({id: res[i].id, header: res[i].header, body: res[i].body});
      // }
      this.notifications = res;
      this.dataSource = new MatTableDataSource<Notification>(this.notifications);
      this.dataSource.paginator = this.paginator;
      //console.log(this.notifications);
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
      this.notificationsService.error('Ошибка получения')
    });
  }

}
