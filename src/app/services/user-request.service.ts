import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskTemplate} from '../interfaces/task-template';
import {RewardTemplate} from '../interfaces/reward-template';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  readonly ADD_USER_TASK = 'https://fast-temple-89292.herokuapp.com/v1/user/task/add';
  readonly ADD_USER_TASK_LOCAL = 'http://localhost:3000/v1/user/task/add';

  readonly ADD_USER_REWARD = 'https://fast-temple-89292.herokuapp.com/v1/user/reward/add';
  readonly ADD_USER_REWARD_LOCAL = 'http://localhost:3000/v1/user/reward/add';

  readonly ACCEPT_REWARD = 'https://fast-temple-89292.herokuapp.com/v1/user/reward/accept';
  readonly ACCEPT_REWARD_LOCAL = 'http://localhost:3000/v1/user/reward/accept';

  readonly ACCEPT_TASK = 'https://fast-temple-89292.herokuapp.com/v1/user/task/accept';
  readonly ACCEPT_TASK_LOCAL = 'http://localhost:3000/v1/user/task/accept';

  readonly GET_ALL_USER_REWARDS = 'https://fast-temple-89292.herokuapp.com/v1/users/rewards';
  readonly GET_ALL_USER_REWARDS_LOCAL = 'http://localhost:3000/v1/users/rewards';

  readonly GET_ALL_USER_TASKS = 'https://fast-temple-89292.herokuapp.com/v1/users/tasks';
  readonly GET_ALL_USER_TASKS_LOCAL = 'http://localhost:3000/v1/user/users/tasks';

  constructor(private http: HttpClient) { }

  addUserTask(task: TaskTemplate) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.put(this.ADD_USER_TASK_LOCAL, {title: task.title, points: task.points, description: task.description}, {headers}).toPromise()
      .then((req) => console.log(req['message']));
  }

  addUserReward(reward: RewardTemplate) {
    console.log(reward.title);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.put(this.ADD_USER_REWARD_LOCAL,
      {title: reward.title, points: reward.points, description: reward.description}, {headers}).toPromise()
      .then((req) => {
        console.log(req['message']);
      });
  }

  approveTask(taskId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.patch(this.ACCEPT_TASK_LOCAL, {taskId}, {headers}).toPromise()
      .then((req) => console.log(req['message']))
      .catch((req) => console.warn(req['message']));

  }

  approveReward(rewardId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.patch(this.ACCEPT_REWARD_LOCAL, {rewardId}, {headers}).toPromise()
      .then((req) => console.log(req['message']))
      .catch((req) => console.warn(req['message']));
  }

  getAllUserRewards(): Observable<any> {
    return null;
  }

  getAllUserTasks(): Observable<any> {
    return null;
  }
}

