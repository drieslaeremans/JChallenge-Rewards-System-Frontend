import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskTemplate} from '../interfaces/task-template';
import {RewardTemplate} from '../interfaces/reward-template';
import {Observable} from 'rxjs';
import { promise } from 'protractor';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  api: string = environment.APIEndPoint;
  readonly ADD_USER_TASK = this.api + '/user/task/add';
  readonly ADD_USER_REWARD = this.api + '/user/reward/add';
  readonly ACCEPT_REWARD = this.api + '/user/reward/accept';
  readonly ACCEPT_TASK = this.api + '/user/task/accept';
  readonly GET_ALL_USERS_REWARDS = this.api + '/users/rewards';
  readonly GET_ALL_USERS_TASKS = this.api + '/users/tasks';
  readonly GET_ALL_USER_TASKS = this.api + '/user/tasks';
  readonly GET_ALL_USER_REWARDS = this.api + '/user/rewards';

  constructor(private http: HttpClient) { }

  addUserTask(task: TaskTemplate) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.put(this.ADD_USER_TASK, {title: task.title, points: task.points, description: task.description}, {headers}).toPromise()
      .then((req) => console.log(req['message']));
  }

  addUserReward(reward: RewardTemplate){
    console.log(reward.title);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    var points = Number();

    return new Promise(resolve => {
      this.http.put(this.ADD_USER_REWARD,
        {title: reward.title, points: reward.points, description: reward.description}, {headers}).toPromise()
        .then((req) => {
          console.log(parseInt(req['points']));
          points = req['points'];
          resolve(points);
        });
    });
  }

  approveTask(taskId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.patch(this.ACCEPT_TASK, {taskId}, {headers}).toPromise()
      .then((req) => console.log(req['message']))
      .catch((req) => console.warn(req['message']));

  }

  approveReward(rewardId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.patch(this.ACCEPT_REWARD, {rewardId}, {headers}).toPromise()
      .then((req) => console.log(req['message']))
      .catch((req) => console.warn(req['message']));
  }

  getAllUsersRewards(): Observable<any> {
    return this.http.get<any[]>(this.GET_ALL_USERS_REWARDS);
  }

  getAllUsersTasks(): Observable<any> {
    return this.http.get<any[]>(this.GET_ALL_USERS_TASKS);
  }

  getAllUserRewards(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });
    console.log(this.http.get<any[]>(this.GET_ALL_USER_REWARDS, {headers}));
    return this.http.get<any[]>(this.GET_ALL_USER_REWARDS, {headers});
  }

  getAllUserTasks(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });
    return this.http.get<any[]>(this.GET_ALL_USER_TASKS, {headers});
  }
}

