import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  readonly GET_USER_REWARDS = 'https://fast-temple-89292.herokuapp.com/v1/user/:token/rewards';

  readonly GET_REWARDS_TEMPLATES = 'https://fast-temple-89292.herokuapp.com/v1/rewards/templates';
  readonly GET_REWARDS_TEMPLATES_LOCAL = 'http://localhost:3000/v1/rewards/templates';

  readonly GET_REWARDS_TEMPLATE = 'https://fast-temple-89292.herokuapp.com/v1/reward/template';
  readonly GET_REWARDS_TEMPLATE_LOCAL = 'http://localhost:3000/v1/reward/template';

  readonly DELETE_REWARD_TEMPLATE = 'https://fast-temple-89292.herokuapp.com/v1/reward/template/delete/';
  readonly DELETE_REWARD_TEMPLATE_LOCAL = 'http://localhost:3000/v1/reward/template/delete/';

  readonly ADD_REWARDS_API = 'https://fast-temple-89292.herokuapp.com/v1/reward/template/add';
  readonly ADD_REWARDS_API_LOCAL = 'http://localhost:3000/v1/reward/template/add';

  readonly GET_REWARDS_FEED = 'https://fast-temple-89292.herokuapp.com/v1/rewards/feed'

  constructor(private http: HttpClient) { }

  getRewardTemplates(): Observable<any[]> {
    return this.http.get<any[]>(this.GET_REWARDS_TEMPLATES_LOCAL);
  }

  getRewardTemplateById(templateId): Observable<any> {
    return this.http.get<any>(this.GET_REWARDS_TEMPLATE + '/' + templateId);
  }

  getRewardFeed(limit = 3): Observable<any[]> {
    return this.http.get<any[]>(this.GET_REWARDS_FEED + '/' + limit);
  }

  addRewardTemplate(title: string, points: number, description: string) {
    this.http.post(this.ADD_REWARDS_API_LOCAL,
      {title, points, description, token: localStorage.getItem('userToken')}).toPromise()
      .then( (message) => console.log(message['message']));
  }

  deleteRewardTemplate(templateId: string) {
    this.http.delete(this.DELETE_REWARD_TEMPLATE_LOCAL + '/' + templateId);
  }
}
