import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskTemplate} from '../interfaces/task-template';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  readonly GET_USER_TASKS = 'https://fast-temple-89292.herokuapp.com/v1/user/:token/tasks';

  readonly GET_TASKS_TEMPLATES = 'https://fast-temple-89292.herokuapp.com/v1/tasks/templates';
  readonly GET_TASKS_TEMPLATES_LOCAL = 'http://localhost:3000/v1/tasks/templates';

  readonly GET_TASKS_TEMPLATE = 'https://fast-temple-89292.herokuapp.com/v1/task/template';
  readonly GET_TASKS_TEMPLATE_LOCAL = 'http://localhost:3000/v1/task/template';

  readonly DELETE_TASK_TEMPLATE = 'https://fast-temple-89292.herokuapp.com/v1/task/template';
  readonly DELETE_TASK_TEMPLATE_LOCAL = 'http://localhost:3000/v1/task/template';

  readonly ADD_TASKS_API = 'https://fast-temple-89292.herokuapp.com/v1/task/template/add';
  readonly ADD_TASKS_API_LOCAL = 'http://localhost:3000/v1/task/template/add';

  readonly UPDATE_TASKS_API = 'https://fast-temple-89292.herokuapp.com/v1/task/template';
  readonly UPDATE_TASKS_API_LOCAL = 'http://localhost:3000/v1/task/template';

  readonly GET_TASKS_FEED = 'https://fast-temple-89292.herokuapp.com/v1/tasks/feed';
  readonly GET_TASKS_FEED_LOCAL = 'http://localhost:3000/v1/tasks/feed';

  constructor(private http: HttpClient) { }

  getTaskTemplates(): Observable<any[]> {
    return this.http.get<any[]>(this.GET_TASKS_TEMPLATES_LOCAL);
  }

  getTaskTemplateById(templateId): Observable<any> {
    return this.http.get<any>(this.GET_TASKS_TEMPLATE + '/' + templateId);
  }

  getTaskFeed(limit = 3): Observable<any[]> {
    return this.http.get<any[]>(this.GET_TASKS_FEED_LOCAL + '/' + limit);
  }

  addTaskTemplate(task: TaskTemplate) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.post(this.ADD_TASKS_API_LOCAL,
      {title: task.title, points: task.points, description: task.description}, {headers : headers}).toPromise()
      .then( (message) => console.log(message['message']));
  }

  updateTaskTemplate(task: TaskTemplate) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.put(this.UPDATE_TASKS_API_LOCAL + '/' + task._id,
      {title: task.title, points: task.points, description: task.description}, {headers: headers}).toPromise()
      .then((message) => console.log(message['message']));

  }

  deleteTaskTemplate(templateId: string) {
    if (confirm('Ben je zeker dat je deze taak wilt verwijderen?\nDeze actie kan niet ongedaan gemaakt worden.')) {
      this.http.delete(this.DELETE_TASK_TEMPLATE_LOCAL + '/' + templateId).toPromise()
        .then((message) => console.log(message['message']));
    }
  }
}
