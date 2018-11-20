import { Component, OnInit } from '@angular/core';
import {TasksService} from '../services/tasks.service';
import {RewardsService} from '../services/rewards.service';
import {TaskTemplate} from '../interfaces/task-template';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  takenfeed$;

  constructor(public rewardsService: RewardsService, public tasksService: TasksService) { }

  ngOnInit() {
    this.takenfeed$ = this.tasksService.getTaskFeed();
  }

}
