import { Component, OnInit } from '@angular/core';
import {TasksService} from '../services/tasks.service';
import {RewardsService} from '../services/rewards.service';
import {TaskTemplate} from '../interfaces/task-template';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  takenfeed$;
  user: User;

  constructor(public rewardsService: RewardsService, public tasksService: TasksService, private authService: AuthService) { }

  ngOnInit() {
    this.takenfeed$ = this.tasksService.getTaskFeed();
    this.authService.userData$.subscribe(data => this.user = data);
  }

}
