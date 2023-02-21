import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EditUserService} from './edit-user.service';
import {NotificationsService} from 'angular2-notifications';
import {NgForm} from '@angular/forms';
import {user} from '@angular/fire/auth';
import {User} from '../user';
import {ConfirmDialogComponent} from '../../../../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  rolesList = ['Работник', 'Медик', 'Хантер', 'Водитель', 'Дрессировщик', 'Навигатор', 'Управляющий', 'Инспектор'];
  user!: any;

  constructor(private router: Router,
              private editUserService: EditUserService,
              private notificationService: NotificationsService,
              public dialog: MatDialog) {
    this.user = this.router.getCurrentNavigation()!.extras.state!['row'];
  }

  ngOnInit(): void {

  }

  private editUser(user: any) {
    user.role = this.role_to_eng(user.role);
    this.editUserService.editUser(user).subscribe(
      () => {
        this.notificationService.success("Успех", "Пользователь изменён");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка изменения пользователя");
      }
    );
  }

  deleteUser(id: number) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.editUserService.deleteUser(id).subscribe(() => {
          });
          this.router.navigateByUrl('/content/(sidebar:personal)');
        }
      });
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
      case 'Инспектор':
        eng_role = 'Inspector';
        break;
    }
    return eng_role;
  }

  onSubmit(accountForm: NgForm) {
    this.editUser(accountForm.value);
  }
}
