import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbCollapseModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbCollapseModule.forRoot()
  ],
  exports: [
    NgbCollapseModule
  ],
  declarations: []
})
export class NgBootstrapModule { }
