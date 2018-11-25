import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHandleRequestsComponent } from './admin-handle-requests.component';
import { NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { TasksComponent } from './tasks/tasks.component';
import { RewardsComponent } from './rewards/rewards.component';

@NgModule({
  imports: [
    CommonModule,
    NgbTabsetModule.forRoot()
  ],
  exports: [
    NgbTabsetModule
  ],
  declarations: [AdminHandleRequestsComponent, TasksComponent, RewardsComponent]
})
export class AdminHandleRequestsModule { }
