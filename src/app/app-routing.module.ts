import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import {ContentComponent} from './content/content.component';
import {AlarmComponent} from './alarm/alarm.component';
import {MedicPageComponent} from './medic-page/medic-page.component';
import {TaskComponent} from './task/task.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/auth.guard';
import {SidebarComponent} from './content/sidebar/sidebar.component';
import {PersonalTableComponent} from './content/sidebar/personal-table/personal-table.component';
import {ScheduleTableComponent} from './content/sidebar/schedule-table/schedule-table.component';
import {DinoTrainerComponent} from './dino-trainer/dino-trainer.component';
import {AddUserComponent} from './content/sidebar/personal-table/add-user/add-user.component';
import {EditUserComponent} from './content/sidebar/personal-table/edit-user/edit-user.component';
import {NavigatorComponent} from './navigator/navigator.component';

const routes: Routes = [
  { path: 'sidebar', canActivate:[AuthGuard], component: SidebarComponent, children: [
      { path: 'editUser', outlet: 'sidebar', component: EditUserComponent },
    ]},
  { path: 'notifications', canActivate:[AuthGuard], component: NotificationComponent },
  { path: 'alarm', canActivate:[AuthGuard], component: AlarmComponent },
  { path: 'medicPage', canActivate:[AuthGuard], data: {role: 'Medic'}, component: MedicPageComponent },
  { path: 'dinotrainer', canActivate:[AuthGuard], data: {role: 'DinoTrainer'}, component: DinoTrainerComponent },
  { path: 'navigator', canActivate:[AuthGuard], data: {role: 'Navigator'}, component: NavigatorComponent },
  { path: 'tasks', canActivate:[AuthGuard], component: TaskComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'content', canActivate:[AuthGuard], component: ContentComponent, children: [
      { path: '', outlet: 'sidebar', canActivate:[AuthGuard], component: NotificationComponent },
      { path: 'notifications', outlet: 'sidebar', canActivate:[AuthGuard], component: NotificationComponent },
      { path: 'schedule', outlet: 'sidebar', canActivate:[AuthGuard], component: ScheduleTableComponent },
      { path: 'addUser', outlet: 'sidebar', canActivate:[AuthGuard], component: AddUserComponent },
      { path: 'personal', outlet: 'sidebar', canActivate:[AuthGuard], component: PersonalTableComponent },
      { path: 'addUser', outlet: 'sidebar', canActivate:[AuthGuard], component: AddUserComponent },
  ]}
  // { path: 'notifications', component: NotificationComponent },
  // { path: 'alarm', component: AlarmComponent },
  // { path: 'medicPage', component: MedicPageComponent },
  // { path: 'tasks', component: TaskComponent },
  // { path: 'login', component: LoginComponent },
  // { path: '',   redirectTo: '/login', pathMatch: 'full' },
  // { path: 'content', component: ContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
