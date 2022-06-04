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
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    NotificationComponent,
    NavbarComponent,
    AlarmComponent,
    MedicPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NgbModule
  ],
  providers: [ContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
