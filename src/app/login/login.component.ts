import { Component, OnInit } from '@angular/core';
import { AlertBox } from '../interfaces/alert-box';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  alertBox: AlertBox = {
    message: '',
    color: ''
  };

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.alertBox$.subscribe(data => {
       this.alertBox = data;
    });
  }

  emailLogin(data: any, isValid: string) {
    this.authService.clearMessage();
    if (isValid) {
      this.authService.login(data.email, data.password);
      localStorage.setItem('loginData', JSON.stringify(data));
    } else {
      this.authService.setMessage('Email/password zijn niet correct', 'alert-danger');
    }
  }

}
