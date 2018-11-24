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
  rewardFeed$;
  user: User;

  constructor(public rewardsService: RewardsService, public tasksService: TasksService, private authService: AuthService) { }

  ngOnInit() {
    this.takenfeed$ = this.tasksService.getTaskFeed();
    this.rewardFeed$ = this.rewardsService.getRewardFeed();
    console.log(this.rewardFeed$);
    console.log(this.takenfeed$);
    this.authService.userData$.subscribe(data => this.user = data);
  }

  setTaskFeed(limit: number) {
    this.takenfeed$ = this.tasksService.getTaskFeed(limit);
  }

  setRewardFeed(limit: number) {
    this.rewardFeed$ = this.rewardsService.getRewardFeed();
  }

}
