import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { EMPTY, Observable} from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';
import {AlertBox} from '../interfaces/alert-box';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  alertBox$: BehaviorSubject<AlertBox> = new BehaviorSubject(null);
  userData$: BehaviorSubject<User> = new BehaviorSubject(null);
  readonly LOGIN_API_URL = 'https://fast-temple-89292.herokuapp.com/user/login';
  readonly LOGIN_API_URL_LOCAL = 'http://localhost:3000/user/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    this.logout();
    this.meldAan(email, password);
  }

  meldAan(email: string, password: string) {
    return this.http.post(this.LOGIN_API_URL_LOCAL, {email, password})
      .subscribe(
        (res) => {
          if (res !== 'Foute login') {
            this.setUserData(res);
          } else {
            console.log('it works');
          }
        },
        err => console.log(err)
      );
  }

  logout() {
    this.clearMessage();
    localStorage.removeItem('user');
    this.userData$.next(null);
  }

  setUserData(user) {
    if (user !== null) {
      this.userData$.next({
        _id: user._id,
        email: user.email,
        name: user.name,
        password: '',
        type: user.type,
      });
    } else {
      this.userData$.next(null);
    }

    console.log('userdata', this.userData$);
  }

  // Message BS4 alert-box
  setMessage(msg: string, color: string) {
    this.alertBox$.next({
      message: msg,
      color: color
    });
  }

  clearMessage() {
    this.alertBox$.next(null);
  }

}
