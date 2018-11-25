import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {OpdrachtenComponent} from './opdrachten/opdrachten.component';
import {WinkelComponent} from './winkel/winkel.component';
import {LoginComponent} from './login/login.component';
import {WorkerGuard} from './guards/worker.guard';
import {UserGuard} from './guards/user.guard';
import {AdminRewardsComponent} from './admin-rewards/admin-rewards.component';
import {AdminGuard} from './guards/admin.guard';
import {AdminTasksComponent} from './admin-tasks/admin-tasks.component';
import {AdminHandleRequestsComponent} from './admin-handle-requests/admin-handle-requests.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [UserGuard] },
  {path: 'opdrachten', component: OpdrachtenComponent, canActivate: [WorkerGuard]},
  {path: 'winkel', component: WinkelComponent, canActivate: [WorkerGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'rewardsettings', component: AdminRewardsComponent, canActivate: [AdminGuard]},
  {path: 'tasksettings', component: AdminTasksComponent, canActivate: [AdminGuard]},
  {path: 'requests', component: AdminHandleRequestsComponent, canActivate: [AdminGuard]},
  {path: '', component: HomeComponent, canActivate: [UserGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
