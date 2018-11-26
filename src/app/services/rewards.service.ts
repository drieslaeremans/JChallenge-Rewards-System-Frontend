import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RewardTemplate} from '../interfaces/reward-template';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  api: string = environment.APIEndPoint;
  readonly GET_REWARDS_TEMPLATES = this.api + '/rewards/templates';
  readonly GET_REWARDS_TEMPLATE = this.api + '/reward/template';
  readonly DELETE_REWARD_TEMPLATE = this.api + '/reward/template';
  readonly ADD_REWARDS_API = this.api + '/reward/template/add';
  readonly UPDATE_REWARDS_API = this.api + '/reward/template';
  readonly GET_REWARDS_FEED = this.api + '/rewards/feed';

  constructor(private http: HttpClient) { }

  getRewardTemplates(): Observable<any[]> {
    return this.http.get<any[]>(this.GET_REWARDS_TEMPLATES).pipe(
      tap(results => {
        results.sort((a, b) => a.points < b.points ? -1 : 1);
      })
    );
  }

  getRewardTemplateById(templateId): any {
    return this.http.get<any>(this.GET_REWARDS_TEMPLATE + '/' + templateId);
  }

  getRewardFeed(limit = 3): Observable<any[]> {
    return this.http.get<any[]>(this.GET_REWARDS_FEED + '/' + limit);
  }

  addRewardTemplate(reward: RewardTemplate) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    return new Promise(resolve => {
    this.http.post(this.ADD_REWARDS_API,
      {title: reward.title, points: reward.points, description: reward.description}, {headers : headers}).toPromise()
      .then((message) => {
        console.log(message['message']);
        resolve();
      });
    });
  }


  updateRewardTemplate(reward: RewardTemplate) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    return new Promise(resolve => {
    this.http.put(this.UPDATE_REWARDS_API + '/' + reward._id,
      {title: reward.title, points: reward.points, description: reward.description}, {headers: headers}).toPromise()
      .then((message) => {
        console.log(message['message']);
        resolve();
      });
    });
  }

  deleteRewardTemplate(templateId: string) {
    return new Promise(resolve => {
      if (confirm('Ben je zeker dat je deze reward wilt verwijderen?\nDeze actie kan niet ongedaan gemaakt worden.')) {
    this.http.delete(this.DELETE_REWARD_TEMPLATE + '/' + templateId).toPromise()
      .then((message) => {
        console.log(message['message']);
        resolve();
      });
    }
    });
  }
}
