import { Component, OnInit } from '@angular/core';
import {ContentService} from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  employeeType: String | undefined;
  isAlarmOn: boolean;

  constructor(public contentService: ContentService) {
    this.contentService.setEmployeeRole('Medic');
    if (localStorage.getItem('alarm') === 'true') {
      this.isAlarmOn = true;
      this.contentService.setIsAlarmOn(true);
      console.log('hello true');
    } else {
        console.log(localStorage.getItem('alarm'));
        localStorage.setItem('alarm', 'false');
        this.isAlarmOn = false;
    }
  }

  ngOnInit() {
    //this.employeeType = this.contentService.getEmployeeRole();
    //this.isAlarmOn = this.contentService.getIsAlarmOn();
  }

}
