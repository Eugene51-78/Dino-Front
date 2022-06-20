import {Component, HostBinding, HostListener, OnInit, ViewChild} from '@angular/core';
import {ContentService} from '../content/content.service';
import {ContentComponent} from '../content/content.component';
import {AuthService} from '../login/auth.service';
import {Employee} from '../content/employee.interface';
import {Alarm} from '../alarm/alarm.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  alarm!: Alarm;
  employee!: Employee;

  isFixedNavbar: boolean | undefined;
  @HostBinding('class.navbar-opened') navbarOpened = false;
  @ViewChild('ContentComponent') contentComponent: ContentComponent | undefined;

  constructor(public contentService: ContentService, public auth: AuthService) {
    this.employee = this.contentService.employee;
  }

  ngOnInit() {
    this.getEmployeeFromServer();
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
      console.log('Ошибка', err);
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
