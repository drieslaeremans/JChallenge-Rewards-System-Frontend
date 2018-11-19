import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import {HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable} from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$: BehaviorSubject<User> = new BehaviorSubject(null);
  readonly LOGIN_API_URL = 'https://fast-temple-89292.herokuapp.com/user/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const user = this.getUser(email, password);
    console.log(user);
  }

  getUser(email: string, password: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.get(this.LOGIN_API_URL, {params})
      .pipe(
        tap(req => console.log('get-request', req)),
        catchError((error) => {
          console.warn(error);
          alert(error.message);
          return EMPTY;
        }),
        share()
      );
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
  }
}
