import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import {ContentService} from '../content.service';
import {Employee} from '../employee.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  employee!: Employee;

  constructor(public appService: AppService, public contentService: ContentService) {
    this.employee = contentService.getEmployee();
  }

  ngOnInit(): void {
  }

}
