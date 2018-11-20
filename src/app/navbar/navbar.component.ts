import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe(data => this.user = data);
  }

}
