import {Component, HostBinding, HostListener, OnInit, ViewChild} from '@angular/core';
import {ContentService} from '../content/content.service';
import {ContentComponent} from '../content/content.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  employeeRole: string;

  isFixedNavbar: boolean | undefined;
  @HostBinding('class.navbar-opened') navbarOpened = false;
  @ViewChild('ContentComponent') contentComponent: ContentComponent | undefined;
  constructor(public contentService: ContentService) {
    this.employeeRole = this.contentService.getEmployeeRole();
  }

  ngOnInit() {
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
