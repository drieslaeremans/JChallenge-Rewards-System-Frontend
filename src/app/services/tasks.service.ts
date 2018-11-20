import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, share, tap} from 'rxjs/operators';
import {TaskTemplate} from '../interfaces/task-template';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  readonly GET_USER_TASKS = 'https://fast-temple-89292.herokuapp.com/v1/user/:token/tasks';

  readonly GET_TASKS_TEMPLATES = 'https://fast-temple-89292.herokuapp.com/v1/tasks/templates';
  readonly GET_TASKS_TEMPLATES_LOCAL = 'http://localhost:3000/v1/tasks/templates';

  readonly GET_TASKS_TEMPLATE = 'https://fast-temple-89292.herokuapp.com/v1/tasks/template';
  readonly GET_TASKS_TEMPLATE_LOCAL = 'http://localhost:3000/v1/tasks/template';

  readonly DELETE_TASK_TEMPLATE = 'https://fast-temple-89292.herokuapp.com/v1/task/template/delete/';
  readonly DELETE_TASK_TEMPLATE_LOCAL = 'http://localhost:3000/v1/task/template/delete/';

  readonly ADD_TASKS_API = 'https://fast-temple-89292.herokuapp.com/v1/task/template/add';
  readonly ADD_TASKS_API_LOCAL = 'http://localhost:3000/v1/task/template/add';

  constructor(private http: HttpClient) { }

  getTaskTemplates() {
    return this.http.get(this.GET_TASKS_TEMPLATES)
      .toPromise().then((task) => console.log(task));
  }

  getTaskTemplate(templateId) {
    return this.http.post(this.GET_TASKS_TEMPLATE, {templateId}).toPromise().then((req) => console.log(req));
  }

  addTaskTemplate(task: TaskTemplate) {
    this.http.post(this.ADD_TASKS_API, {title: task.title, points: task.points, description: task.description})
      .toPromise().then((req) => console.log(req));
  }

  deleteTaskTemplate(templateId: string) {
    this.http.delete(this.DELETE_TASK_TEMPLATE + '/' + templateId);
  }
}
