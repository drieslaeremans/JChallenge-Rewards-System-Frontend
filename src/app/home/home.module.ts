import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TargetComponent } from './target/target.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, TargetComponent]
})
export class HomeModule { }
