import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {AlertBox} from '../interfaces/alert-box';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  alertBox$: BehaviorSubject<AlertBox> = new BehaviorSubject(null);
  userData$: BehaviorSubject<User> = new BehaviorSubject(null);
  readonly LOGIN_API_URL = 'https://fast-temple-89292.herokuapp.com/v1/user/login';
  readonly LOGIN_API_URL_LOCAL = 'http://localhost:3000/v1/user/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    console.log('in login');
    this.logout();
    this.meldAan(email, password);
  }

  meldAan(email: string, password: string) {
    console.log('in meldAan');
    return this.http.post(this.LOGIN_API_URL_LOCAL, {email, password})
      .subscribe(
        (res) => {
          this.setMessage('Aanmelden gelukt. Even geduld', 'alert-success');
          this.setUserData(res);
          console.log(res);
        },
        (error) => {
          this.setMessage('Foutieve login', 'alert-danger');
          console.log('Foutieve login');
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
        punten: user.punten || 150
      });
      localStorage.setItem('userToken', user.token);
      this.router.navigate(['/home']);
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
