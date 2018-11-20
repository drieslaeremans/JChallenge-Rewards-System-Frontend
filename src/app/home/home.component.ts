import { Component, OnInit } from '@angular/core';
import {TasksService} from '../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  readonly USER_URL = '';
  constructor(public tasksService: TasksService) { }

  ngOnInit() {
  }

}
