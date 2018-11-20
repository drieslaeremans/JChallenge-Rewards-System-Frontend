import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TaskTemplate} from '../interfaces/task-template';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {appendNgContent} from '@angular/core/src/view/ng_content';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  readonly GET_USER_TASKS = 'https://fast-temple-89292.herokuapp.com/v1/user/:token/tasks';

  readonly GET_TASKS_TEMPLATES = 'https://fast-temple-89292.herokuapp.com/v1/tasks/templates';
  readonly GET_TASKS_TEMPLATES_LOCAL = 'http://localhost:3000/v1/tasks/templates';

  readonly GET_TASKS_TEMPLATE = 'https://fast-temple-89292.herokuapp.com/v1/task/template';
  readonly GET_TASKS_TEMPLATE_LOCAL = 'http://localhost:3000/v1/task/template';

  readonly DELETE_TASK_TEMPLATE = 'https://fast-temple-89292.herokuapp.com/v1/task/template/delete/';
  readonly DELETE_TASK_TEMPLATE_LOCAL = 'http://localhost:3000/v1/task/template/delete/';

  readonly ADD_TASKS_API = 'https://fast-temple-89292.herokuapp.com/v1/task/template/add';
  readonly ADD_TASKS_API_LOCAL = 'http://localhost:3000/v1/task/template/add';

  readonly GET_TASKS_FEED = 'https://fast-temple-89292.herokuapp.com/v1/tasks/feed'

  constructor(private http: HttpClient) { }

  getTaskTemplates(): Observable<any[]> {
    return this.http.get<any[]>(this.GET_TASKS_TEMPLATES_LOCAL);
  }

  getTaskTemplateById(templateId): Observable<any> {
    return this.http.get<any>(this.GET_TASKS_TEMPLATE + '/' + templateId);
  }

  getTaskFeed(limit = 3): Observable<any[]> {
    return this.http.get<any[]>(this.GET_TASKS_FEED + '/' + limit);
  }

  addTaskTemplate(title: string, points: number, description: string) {
    this.http.post(this.ADD_TASKS_API_LOCAL,
      {title, points, description, token: localStorage.getItem('userToken')}).toPromise()
      .then( (message) => console.log(message['message']));
  }

  deleteTaskTemplate(templateId: string) {
    this.http.delete(this.DELETE_TASK_TEMPLATE_LOCAL + '/' + templateId);
  }
}
