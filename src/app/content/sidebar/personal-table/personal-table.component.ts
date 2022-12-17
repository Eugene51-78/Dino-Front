import {PersonalTableService} from './personal-table.service';
import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../../employee.interface';
import { User, UserColumns } from './user';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';

const USER_DATA = [
  {"id": 10, "first_name": "John", "second_name": "Smith", 'middle_name': 'Александрович', "role": "Хантер", "age": 36, "email": "mail@dino.ru", "password": '12345d'},
  {"name": "Igor Masri", "occupation": "Developer", "age": 28},
  {"name": "Peter Adams", "occupation": "HR", "age": 20},
  {"name": "Lora Bay", "occupation": "Marketing", "age": 43}
];

@Component({
  selector: 'app-personal-table',
  templateUrl: './personal-table.component.html',
  styleUrls: ['./personal-table.component.css'],
  providers: [PersonalTableService]
})

export class PersonalTableComponent {
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  dataSource: any = USER_DATA;
  columnsSchema: any = UserColumns;

  constructor(private personalTableService: PersonalTableService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.personalTableService.getUsers().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  editRow(row: User) {
    if (row.id === 0) {
      this.personalTableService.addUser(row).subscribe((newUser: User) => {
        row.id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.personalTableService.updateUser(row).subscribe(() => (row.isEdit = false));
    }
  }

  addRow() {
    const newRow: { firstName: string; isEdit: boolean; middleName: string; id: number; email: string } = {
      id: 0,
      firstName: '',
      middleName: '',
      email: '',
      isEdit: true,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: number) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.personalTableService.deleteUser(id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: User) => u.id !== id
            );
          });
        }
      });
  }
}
