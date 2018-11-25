import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbCollapseModule,
  NgbModalModule,
  NgbTabsetModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbCollapseModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbTabsetModule
  ],
  exports: [
    NgbCollapseModule,
    NgbModalModule,
    NgbTabsetModule
  ],
  declarations: []
})
export class NgBootstrapModule { }
