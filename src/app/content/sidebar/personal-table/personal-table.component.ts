import {PersonalTableService} from './personal-table.service';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Employee} from '../../employee.interface';
import { User, UserColumns } from './user';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

function translateRole(name: string) {
  switch (name){
    case 'Medic':
      return 'Медик';
    case 'Driver':
      return 'Водитель';
    case 'DinoTrainer':
      return 'Дрессировщик';
    case 'Manager':
      return 'Управляющий';
    case 'Worker':
      return 'Работник';
    case 'Navigator':
      return 'Навигатор';
    case 'Hunter':
      return 'Хантер';
  }
  return name;
}

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
        res[i]['role'] = translateRole(res[i]['role'].name);
      }
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
