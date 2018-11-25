import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {AlertBox} from '../interfaces/alert-box';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api: string = environment.APIEndPoint;
  loading: boolean;
  alertBox$: BehaviorSubject<AlertBox> = new BehaviorSubject(null);
  userData$: BehaviorSubject<User> = new BehaviorSubject(null);
  readonly LOGIN_API_URL = this.api + '/user/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    this.logout();
    this.meldAan(email, password);
  }

  meldAan(email: string, password: string) {
    this.loading = true;
    return this.http.post(this.LOGIN_API_URL, {email, password})
      .subscribe(
        (res) => {
          this.setMessage('Aanmelden gelukt. Even geduld', 'alert-success');
          this.setUserData(res);
        },
        (error) => {
          this.setMessage('Foutieve login', 'alert-danger');
          this.loading = false;
        }
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
        punten: user.points,
        target: user.target
      });
      localStorage.setItem('userToken', user.token);
      this.router.navigate(['/home']);
    } else {
      this.userData$.next(null);
    }

    this.loading = false;
  }

  changePoints(user) {
    if (user !== null) {
      this.userData$.next({
        _id: user._id,
        email: user.email,
        name: user.name,
        password: '',
        type: user.type,
        punten: user.points,
        target: user.target
      });
    } else {
      this.userData$.next(null);
    }
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
