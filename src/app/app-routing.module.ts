import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import {ContentComponent} from './content/content.component';
import {AlarmComponent} from './alarm/alarm.component';
import {MedicPageComponent} from './medic-page/medic-page.component';
import {TaskComponent} from './task/task.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/auth.guard';

const routes: Routes = [
  // { path: 'notifications', canActivate:[AuthGuard], component: NotificationComponent },
  // { path: 'alarm', canActivate:[AuthGuard], component: AlarmComponent },
  // { path: 'medicPage', canActivate:[AuthGuard], component: MedicPageComponent },
  // { path: 'tasks', canActivate:[AuthGuard], component: TaskComponent },
  // { path: 'login', component: LoginComponent },
  // { path: '',   redirectTo: '/login', pathMatch: 'full' },
  // { path: 'content', canActivate:[AuthGuard], component: ContentComponent },
  { path: 'notifications', component: NotificationComponent },
  { path: 'alarm', component: AlarmComponent },
  { path: 'medicPage', component: MedicPageComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'content', component: ContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
