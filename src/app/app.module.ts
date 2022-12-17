import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { AppRoutingModule } from './app-routing.module';
import { NotificationComponent } from './notification/notification.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlarmComponent } from './alarm/alarm.component';
import { MedicPageComponent } from './medic-page/medic-page.component';
import {ContentService} from './content/content.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TaskComponent } from './task/task.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import {MatTableModule} from '@angular/material/table';
import {NotificationService} from './notification/notification.service';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import {TokenInterceptor} from './login/token.interceptor';
import {AngularFireMessagingModule} from '@angular/fire/compat/messaging';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from '../environments/environment';

import {AppService} from './app.service';
import {getRussianPaginatorIntl} from './notification/russian-paginator-intl';
import {MedicPageService} from './medic-page/medic-page.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { SidebarComponent } from './content/sidebar/sidebar.component';
import {PersonalTableComponent} from './content/sidebar/personal-table/personal-table.component';
import {MatInputModule} from '@angular/material/input';
import { ScheduleTableComponent } from './content/sidebar/schedule-table/schedule-table.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DinoTrainerComponent} from './dino-trainer/dino-trainer.component';
import {MatSliderModule} from '@angular/material/slider';

// initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    NotificationComponent,
    NavbarComponent,
    AlarmComponent,
    MedicPageComponent,
    TaskComponent,
    HeaderComponent,
    LoginComponent,
    SidebarComponent,
    PersonalTableComponent,
    ScheduleTableComponent,
    ConfirmDialogComponent,
    DinoTrainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    SimpleNotificationsModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 30,
      percent: 100,
      outerStrokeWidth: 0,
      innerStrokeWidth: 4,
      outerStrokeColor: '#FFFFFF',
      innerStrokeColor: '#FFFFFF',
      space: -1,
      animation: false,
      startFromZero: false,
      showTitle: false,
      showUnits: false,
      showSubtitle: false,
      showBackground: true,
      showInnerStroke: true,
      showZeroOuterStroke: false
    }),
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatSliderModule
  ],
  providers: [ ContentService, NotificationService, MedicPageService, AppService,
              { provide: HTTP_INTERCEPTORS,
                multi: true,
                useClass: TokenInterceptor},
              { provide: MatPaginatorIntl,
                useValue: getRussianPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
