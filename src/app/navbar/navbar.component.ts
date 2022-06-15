import {Component, HostBinding, HostListener, OnInit, ViewChild} from '@angular/core';
import {ContentService} from '../content/content.service';
import {ContentComponent} from '../content/content.component';
import {AuthService} from '../login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  alarm!: {isOn: boolean, type:string};
  employee!: {"id": number, email: string, firstName: string,
    secondName: string, middleName: string, role: { id: number, name: string },
    age: number, location:{"id": number, name: string, longitude: number, latitude: number},
    isBusy: boolean};

  isFixedNavbar: boolean | undefined;
  @HostBinding('class.navbar-opened') navbarOpened = false;
  @ViewChild('ContentComponent') contentComponent: ContentComponent | undefined;

  constructor(public contentService: ContentService, public auth: AuthService) {
    this.employee = this.contentService.employee;
    this.alarm = this.contentService.getAlarm();
  }

  ngOnInit() {
    this.getEmployeeFromServer()
    console.log(this.alarm.isOn);
  }

  getEmployeeFromServer() {  // flag for getData() call without rerender in NgOnInit()
    this.contentService.getEmployeeFromServer().subscribe((res: any) => {
      if (res === null) {
        console.log('res is null');
        return;
      }
      this.employee = res;
      this.contentService.setEmployee(this.employee);
      console.log(this.employee);
      //this.notificationService.success('Получено')
    }, (err: { message: any; }) => {
      console.log('Ошибка', err.message);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (offset > 10) {
      this.isFixedNavbar = true;
    } else {
      this.isFixedNavbar = false;
    }
  }

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }
}
