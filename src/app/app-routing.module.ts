import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import {ContentComponent} from './content/content.component';
import {AlarmComponent} from './alarm/alarm.component';
import {MedicPageComponent} from './medic-page/medic-page.component';
import {TaskComponent} from './task/task.component';

const routes: Routes = [
  { path: 'content', component: ContentComponent },
  { path: 'notifications', component: NotificationComponent },
  { path: 'alarm', component: AlarmComponent },
  { path: 'medicPage', component: MedicPageComponent },
  { path: 'tasks', component: TaskComponent },
  { path: '',   redirectTo: '/content', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
