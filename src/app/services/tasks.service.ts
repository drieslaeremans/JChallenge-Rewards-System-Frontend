import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TaskTemplate} from '../interfaces/task-template';
import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient) { }

  // Geeft alle opdrachten (tasks) die kunnen uitgevoerd worden voor punten
  getTaskTemplates() {
    return this.http.get(this.GET_TASKS_TEMPLATES_LOCAL)
      .toPromise().then((tasks) => console.log(tasks));
  }

  // Geeft 1 task die uitgevoerd kan worden aan de hand van een meegegeven ID
  getTaskTemplate(templateId) {
    return this.http.get(this.GET_TASKS_TEMPLATE_LOCAL + '/' + templateId)
      .toPromise().then((task) => console.log(task));
  }

  // Voegt een task toe aan de database aan de hand van een title, points en description
  addTaskTemplate(title: string, points: number, description: string) {
    console.log('Voor statement');
    this.http.post(this.ADD_TASKS_API_LOCAL,
      {title, points, description, token: localStorage.getItem('userToken')}).toPromise()
      .then( (message) => console.log(message.message));
    console.log('Na statement');

  }

  // Verwijderd een task uit de database aan de hand van de meegegeven ID
  deleteTaskTemplate(templateId: string) {
    this.http.delete(this.DELETE_TASK_TEMPLATE_LOCAL + '/' + templateId);
  }
}
