import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})

export class NavigatorComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];

  model = {name: 'Karl'}

  submitted = false;
  medicList = [1, 2, 3]
  dinoTrainerList = [1, 2, 3]
  driverList = [1, 2, 3]
  medicControl!: FormControl;

  constructor(public appService: AppService) {
  }

  ngOnInit(): void {

  }

  onSubmit(naviForm: any) {
    console.log(naviForm);
    this.submitted = true;
  }

}
