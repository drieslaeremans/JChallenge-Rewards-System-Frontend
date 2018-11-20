import { Component, OnInit } from '@angular/core';
import {TasksService} from '../services/tasks.service';

@Component({
  selector: 'app-opdrachten',
  templateUrl: './opdrachten.component.html',
  styles: []
})
export class OpdrachtenComponent implements OnInit {

  tasks$;
  selectedTask$;

  constructor(public tasksService: TasksService) { }

  ngOnInit() {
    this.tasks$ = this.tasksService.getTaskTemplates();
  }

  changeTask(task) {
    this.selectedTask$ = task;
  }

}
