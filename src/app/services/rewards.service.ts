import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  // Geeft alle opdrachten (rewards) die kunnen uitgevoerd worden voor punten
  getRewardTemplates() {
    return this.http.get(this.GET_REWARDS_TEMPLATES_LOCAL)
      .toPromise().then((rewards) => console.log(rewards));
  }

  // Geeft 1 reward die uitgevoerd kan worden aan de hand van een meegegeven ID
  getRewardTemplate(templateId) {
    return this.http.get(this.GET_REWARDS_TEMPLATE_LOCAL + '/' + templateId)
      .toPromise().then((reward) => console.log(reward));
  }

  // Voegt een reward toe aan de database aan de hand van een title, points en description
  addRewardTemplate(title: string, points: number, description: string) {
    console.log('Voor statement');
    this.http.post(this.ADD_REWARDS_API_LOCAL,
      {title, points, description, token: localStorage.getItem('userToken')}).toPromise()
      .then( (message) => console.log(message['message']));
    console.log('Na statement');

  }

  // Verwijderd een reward uit de database aan de hand van de meegegeven ID
  deleteRewardTemplate(templateId: string) {
    this.http.delete(this.DELETE_REWARD_TEMPLATE_LOCAL + '/' + templateId);
  }
}
