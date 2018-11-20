import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {OpdrachtenComponent} from './opdrachten/opdrachten.component';
import {WinkelComponent} from './winkel/winkel.component';
import {LoginComponent} from './login/login.component';
import {WorkerGuard} from './guards/worker.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'opdrachten', component: OpdrachtenComponent, canActivate: [WorkerGuard]},
  {path: 'winkel', component: WinkelComponent, canActivate: [WorkerGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
