import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  styleUrls: ['./guard.component.css']
})
export class GuardComponent implements OnInit {
  hunterList: any;
  progressStatus: number;

  constructor() {
    this.hunterList = [1, 14, 145];
    this.progressStatus = 0;
  }

  ngOnInit(): void {

  }
}
