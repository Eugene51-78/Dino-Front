import {Component, OnInit, ViewChild} from '@angular/core';
import {ContentComponent} from '../content/content.component';
import {ContentService} from '../content/content.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  isAlarmOn: boolean;
  employeeType: String | undefined;

  @ViewChild('ContentComponent') contentComponent: ContentComponent | undefined;
  constructor(public contentService: ContentService) {
    this.employeeType = this.contentService.getEmployeeRole();
    console.log(this.employeeType);
    // this.isAlarmOn = this.contentService.getIsAlarmOn();
    if (localStorage.getItem('alarm') === 'true')
      this.isAlarmOn = true;
    else {
      this.isAlarmOn = false;
    }
    console.log(this.isAlarmOn);
  }

  ngOnInit() {

  }

  changeAlarm() {
    if (this.isAlarmOn)
      this.isAlarmOn = false;
    else {
      this.isAlarmOn = true;
    }
    this.contentService.setIsAlarmOn(this.isAlarmOn);
    localStorage.setItem('alarm', String(this.contentService.getIsAlarmOn()));
    console.log(this.contentService.getIsAlarmOn());
  }
}
