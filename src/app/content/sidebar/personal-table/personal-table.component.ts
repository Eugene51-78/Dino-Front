import {PersonalTableService} from './personal-table.service';
import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../../employee.interface';

const USER_DATA = [
  {"name": "John Smith", "occupation": "Advisor", "age": 36},
  {"name": "Igor Masri", "occupation": "Developer", "age": 28},
  {"name": "Peter Adams", "occupation": "HR", "age": 20},
  {"name": "Lora Bay", "occupation": "Marketing", "age": 43}
];

const COLUMNS_SCHEMA = [
  {
    key: "name",
    type: "text",
    label: "Full Name"
  },
  {
    key: "occupation",
    type: "text",
    label: "Occupation"
  },
  {
    key: "age",
    type: "number",
    label: "Age"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  }
]

@Component({
  selector: 'app-personal-table',
  templateUrl: './personal-table.component.html',
  styleUrls: ['./personal-table.component.css'],
  providers: [PersonalTableService]
})

export class PersonalTableComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any = USER_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;

  constructor(private personalTableService: PersonalTableService) {

  }


}
