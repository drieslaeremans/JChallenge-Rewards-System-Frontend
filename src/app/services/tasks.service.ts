import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskTemplate} from '../interfaces/task-template';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  api: string = environment.APIEndPoint;
  readonly GET_TASKS_TEMPLATES = this.api + '/tasks/templates';
  readonly GET_TASKS_TEMPLATE = this.api + '/task/template';
  readonly DELETE_TASK_TEMPLATE = this.api + '/task/template';
  readonly ADD_TASKS_API = this.api + '/task/template/add';
  readonly UPDATE_TASKS_API = this.api + '/task/template';
  readonly GET_TASKS_FEED = this.api + '/tasks/feed';

  constructor(private http: HttpClient) { }

  getTaskTemplates(): Observable<any[]> {
    return this.http.get<any[]>(this.GET_TASKS_TEMPLATES);
  }

  getTaskTemplateById(templateId): Observable<any> {
    return this.http.get<any>(this.GET_TASKS_TEMPLATE + '/' + templateId);
  }

  getTaskFeed(limit = 3): Observable<any[]> {
    return this.http.get<any[]>(this.GET_TASKS_FEED + '/' + limit);
  }

  addTaskTemplate(task: TaskTemplate) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.post(this.ADD_TASKS_API,
      {title: task.title, points: task.points, description: task.description}, {headers : headers}).toPromise()
      .then( (message) => console.log(message['message']));
  }

  updateTaskTemplate(task: TaskTemplate) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userToken'),
    });

    this.http.put(this.UPDATE_TASKS_API + '/' + task._id,
      {title: task.title, points: task.points, description: task.description}, {headers: headers}).toPromise()
      .then((message) => console.log(message['message']));

  }

  deleteTaskTemplate(templateId: string) {
    if (confirm('Ben je zeker dat je deze taak wilt verwijderen?\nDeze actie kan niet ongedaan gemaakt worden.')) {
      this.http.delete(this.DELETE_TASK_TEMPLATE + '/' + templateId).toPromise()
        .then((message) => console.log(message['message']));
    }
  }
}
