import {PersonalTableService} from './personal-table.service';
import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../../employee.interface';
import { User, UserColumns } from './user';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router';

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
  dataSource: any;
  columnsSchema: any = UserColumns;

  constructor(private router: Router, private personalTableService: PersonalTableService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.personalTableService.getUsers().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  editUser(row: User) {
    if (row.id === 0) {
      this.personalTableService.addUser(row).subscribe((newUser: User) => {
        row.id = newUser.id;
      });
    } else {
      this.personalTableService.updateUser(row).subscribe();
    }
  }

  addUser() {
    const newRow: { firstName: string; isEdit: boolean; middleName: string; id: number; email: string } = {
      id: 0,
      firstName: '',
      middleName: '',
      email: '',
      isEdit: true,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  deleteUserU(id: number) {
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

  goToAddAccount() {
    this.router.navigateByUrl('/content/(sidebar:addUser)');
  }

}
