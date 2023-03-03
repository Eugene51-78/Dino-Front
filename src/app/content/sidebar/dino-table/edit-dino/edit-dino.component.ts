import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EditDinoService} from './edit-dino.service';
import {NotificationsService} from 'angular2-notifications';
import {NgForm} from '@angular/forms';
import {ConfirmDialogComponent} from '../../../../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dino',
  templateUrl: './edit-dino.component.html',
  styleUrls: ['./edit-dino.component.css']
})
export class EditDinoComponent implements OnInit {

  ageList = ['Новорожденный', 'Молодой', 'Зрелый', 'Пожилой'];
  typeList: string[] = ['Аллозавр', 'Велоцираптор', 'Герреразавр', 'Дейноних',
                        'Дилофозавр', 'Мегалозавр', 'Нодозавр', 'Панфагия', 'Платеозавр', 'Спинозавр',
                        'Ставрикозавр', 'Стегозавр', 'Стиракозавр', 'Церапод', 'Эокурсор'];
  dino!: any;

  constructor(private router: Router,
              private editDinoService: EditDinoService,
              private notificationService: NotificationsService,
              public dialog: MatDialog) {
    this.dino = this.router.getCurrentNavigation()!.extras.state!['row'];
    console.log(this.dino);
    // this.getTypeList();
  }

  ngOnInit(): void {

  }

  private editDino(dino: any) {
    console.log(dino);
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

  deleteDino(id: number) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.editDinoService.deleteDino(id).subscribe(() => {
          });
          this.router.navigateByUrl('/content/(sidebar:dino)');
        }
      });
  }

  onSubmit(accountForm: NgForm) {
    this.editDino(accountForm.value);
  }

  // private getTypeList() {
  //   this.editDinoService.getTypeList().subscribe((res: any) => {
  //     for (let i=0; i < res.length; i++) {
  //       this.typeList.push(res[i]['type']);
  //     }
  //   });
  // }
}
