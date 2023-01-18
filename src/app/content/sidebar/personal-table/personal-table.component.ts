import {PersonalTableService} from './personal-table.service';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Employee} from '../../employee.interface';
import { User, UserColumns } from './user';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NgForm} from '@angular/forms';

// const USER_DATA = [
//   {"id": 10, "first_name": "John", "second_name": "Smith", 'middle_name': 'Александрович', "role": "Хантер", "age": 36, "email": "mail@dino.ru", "password": '12345d'},
//   {"name": "Igor Masri", "occupation": "Developer", "age": 28},
//   {"name": "Peter Adams", "occupation": "HR", "age": 20},
//   {"name": "Lora Bay", "occupation": "Marketing", "age": 43}
// ];

@Component({
  selector: 'app-personal-table',
  templateUrl: './personal-table.component.html',
  styleUrls: ['./personal-table.component.css'],
  providers: [PersonalTableService]
})

export class PersonalTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  dataSource: any;
  columnsSchema: any = UserColumns;

  constructor(private router: Router, private personalTableService: PersonalTableService) {
    this.getUsers();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.personalTableService.getUsers().subscribe((res: any) => {
      console.log(res);
      for (let i=0; i < res.length; i++) {
        res[i]['role'] = res[i]['role'].name;
      }
      console.log(res);
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  addUser(row: User) {
    if (row.id == 0) {
      this.personalTableService.addUser(row).subscribe((newUser: User) => {
        console.log(newUser);
        row.id = newUser.id;
      });
    } else {
      this.personalTableService.updateUser(row).subscribe();
    }
  }

  goToAddAccount() {
    this.router.navigateByUrl('/content/(sidebar:addUser)');
  }

  goToEditAccount(row: any) {
    console.log(row);
    this.router.navigateByUrl('/content/(sidebar:editUser)', { state: {row} });
  }

}
