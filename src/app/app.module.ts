import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgBootstrapModule } from './sharedModules/ng-bootstrap.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeModule } from './home/home.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { LoginModule } from './login/login.module';
import { OpdrachtenModule } from './opdrachten/opdrachten.module';
import { WinkelModule } from './winkel/winkel.module';

import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FooterComponent } from './footer/footer.component';
import { AdminTasksModule } from './admin-tasks/admin-tasks.module';
import { AdminRewardsModule } from './admin-rewards/admin-rewards.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgBootstrapModule,
    HomeModule,
    PageNotFoundModule,
    LoginModule,
    OpdrachtenModule,
    WinkelModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AdminTasksModule,
    AdminRewardsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
