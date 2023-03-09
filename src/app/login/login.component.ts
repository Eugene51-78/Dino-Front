import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {AppService} from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  form = this.fb.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.minLength(6)])
  });

  aSub: Subscription | undefined;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationsService,
              private appService: AppService) { }

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null,[Validators.required, Validators.minLength(6)])
    // });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.notificationService.info('Инфо', 'Вы можете войти в систему');
      } else if (params['accessDenied']) {
        this.notificationService.info('Инфо', 'Авторизуйтесь в системе, чтобы получить доступ!');
      } else if (params['sessionFailed']) {
        this.notificationService.info('Инфо', 'Пожалуйста, войдите в систему заново!');
      }
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit(){
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        this.appService.setEmployeeFromServer();
        this.notificationService.success("Успех", "Вы вошли в систему ПЮР");
        this.router.navigate(['/content']);
      },
      error => {
        console.warn(error);
        //console.log(this.form.value);
        this.notificationService.error("Ошибка входа!", 'Проверьте правильность ввода учетных данных.');
        this.form.enable();
      }
    );
  }
}
