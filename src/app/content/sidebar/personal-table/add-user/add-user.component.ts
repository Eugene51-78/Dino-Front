import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AddUserService} from './add-user.service';
import {User} from '../user';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  rolesList = ['Работник', 'Медик', 'Хантер', 'Водитель', 'Дрессировщик', 'Управляющий'];

  constructor(private addUserService: AddUserService, private notificationService: NotificationsService) { }

  ngOnInit(): void {
  }

  onSubmit(accountForm: NgForm) {
    console.log(accountForm.value);
    this.addUser(accountForm.value);
  }

  private addUser(accountForm: any) {
    this.addUserService.addUser(accountForm).subscribe(
      () => {
        this.notificationService.success("Успех", "Пользователь добавлен");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка добавления пользователя");
      }
    );
  }
}
