import { Component, OnInit } from '@angular/core';
import {UserRequestService} from '../../services/user-request.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: []
})
export class TasksComponent implements OnInit {

  taskLijst$;

  constructor(private urService: UserRequestService) { }

  ngOnInit() {
    this.taskLijst$ = this.urService.getAllUsersTasks();
  }

  taskGoedkeuren(taskId) {
    if (confirm('Deze task goedkeuren?')) {
      this.urService.approveTask(taskId);
    }
  }
}
