import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Target} from '../interfaces/target';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  api: string = environment.APIEndPoint;
  readonly SET_USER_TARGET = this.api + '/user/target';
  readonly GET_USER_TARGET = this.api + '/user/target';
  target: Target = new Target();

  constructor(private http: HttpClient) { }

  setUserTarget(rewardId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.post(this.SET_USER_TARGET, {rewardId}, {headers : headers})
      .toPromise().then((message) => console.log(message['message']));
  }

  getUserTarget() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.get(this.GET_USER_TARGET, {headers: headers}).toPromise()
      .then((res) => {
        this.target.title = res['title'];
        this.target.target = res['target'];
      })
      .catch((res) => {
        this.target.title = 'Nog geen target';
        this.target.target = 0;
      });

    return this.target;
  }

}
