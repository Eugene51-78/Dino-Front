import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AddDinoService} from './add-dino.service';
import {Dino} from '../dino';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-add-dino',
  templateUrl: './add-dino.component.html',
  styleUrls: ['./add-dino.component.css']
})
export class AddDinoComponent implements OnInit {

  ageList = ['Новорожденный', 'Молодой', 'Зрелый', 'Пожилой'];
  typeList!: string[];

  constructor(private addDinoService: AddDinoService, private notificationService: NotificationsService) {
    this.typeList = [];
  }

  ngOnInit(): void {
    this.getTypeList();
  }

  onSubmit(accountForm: NgForm) {
    console.log(accountForm.value);
    this.addDino(accountForm.value);
  }

  private addDino(accountForm: any) {
    this.addDinoService.addDino(accountForm).subscribe(
      () => {
        this.notificationService.success("Успех", "Динозавр добавлен");
      },
      error => {
        console.warn(error);
        this.notificationService.error("Ошибка", "Ошибка добавления динозавра");
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

  private getTypeList() {
    this.addDinoService.getTypeList().subscribe((res: any) => {
      for (let i=0; i < res.length; i++) {
        this.typeList.push(res[i]['type']);
      }
    });
  }

}
