import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EditDinoService} from './edit-dino.service';
import {NotificationsService} from 'angular2-notifications';
import {NgForm} from '@angular/forms';
import {Dino} from '../dino';
import {ConfirmDialogComponent} from '../../../../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dino',
  templateUrl: './edit-dino.component.html',
  styleUrls: ['./edit-dino.component.css']
})
export class EditDinoComponent implements OnInit {

  ageList = ['Новорожденный', 'Молодой', 'Зрелый', 'Пожилой'];
  dino!: any;

  constructor(private router: Router,
              private editDinoService: EditDinoService,
              private notificationService: NotificationsService,
              public dialog: MatDialog) {
    this.dino = this.router.getCurrentNavigation()!.extras.state!['row'];
  }

  ngOnInit(): void {

  }

  private editDino(dino: any) {
    dino.role = this.role_to_eng(dino.role);
    this.editDinoService.editDino(dino).subscribe(
      () => {
        this.notificationService.success("Успех", "Динозавр изменён");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка изменения динозавра");
      }
    );
  }

  deleteUser(id: number) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.editDinoService.deleteUser(id).subscribe(() => {
          });
          this.router.navigateByUrl('/content/(sidebar:dino)');
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
    }
    return eng_role;
  }

  onSubmit(accountForm: NgForm) {
    this.editDino(accountForm.value);
  }

}
