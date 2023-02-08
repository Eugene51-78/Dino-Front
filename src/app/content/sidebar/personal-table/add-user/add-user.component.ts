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

  rolesList = ['Работник', 'Медик', 'Хантер', 'Водитель', 'Дрессировщик', 'Управляющий', 'Навигатор'];

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

  role_to_eng(role: string) {
    let eng_role;
    switch (role) {
      case 'Работник':
        eng_role = 'Worker';
        break;
      case 'Медик':
        eng_role = 'Medic'
        break;
      case 'Управляющий':
        eng_role = 'Manager';
        break;
      case 'Дрессировщик':
        eng_role = 'DinoTrainer';
        break;
      case 'Водитель':
        eng_role = 'Driver';
        break;
      case 'Хантер':
        eng_role = 'Hunter';
        break;
      case 'Навигатор':
        eng_role = 'Navigator';
        break;
    }
    return eng_role;
  }
}
