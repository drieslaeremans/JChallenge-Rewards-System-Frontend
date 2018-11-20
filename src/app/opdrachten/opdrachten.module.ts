import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpdrachtenComponent } from './opdrachten.component';
import { DetailsComponent } from './details/details.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [OpdrachtenComponent, DetailsComponent]
})
export class OpdrachtenModule { }
