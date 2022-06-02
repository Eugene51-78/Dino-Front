import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import {ContentComponent} from './content/content.component';
import {AlarmComponent} from './alarm/alarm.component';
import {MedicPageComponent} from './medic-page/medic-page.component';

const routes: Routes = [
  { path: 'content', component: ContentComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'alarm', component: AlarmComponent },
  { path: 'medicPage', component: MedicPageComponent },
  { path: '',   redirectTo: '/content', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
