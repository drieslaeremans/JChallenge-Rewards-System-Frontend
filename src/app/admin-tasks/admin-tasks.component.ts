import { Component, OnInit } from '@angular/core';
import {TasksService} from '../services/tasks.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TaskTemplate} from '../interfaces/task-template';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styles: []
})
export class AdminTasksComponent implements OnInit {

  taskTemplates$;
  task: TaskTemplate;
  createNew: boolean;
  closeResult: string;

  constructor(private tasksService: TasksService, private modalService: NgbModal) { }

  ngOnInit() {
    this.taskTemplates$ = this.tasksService.getTaskTemplates();
    this.createNew = true;
  }

  deleteTask(taskId: string) {
    this.tasksService.deleteTaskTemplate(taskId).then(() => {
      this.taskTemplates$ = this.tasksService.getTaskTemplates();
    })
  }

  setEditTask(task: TaskTemplate) {
    this.task = task
    this.createNew = false;
  }

  setCreateNew() {
    this.createNew = true;
    this.task = new TaskTemplate();
  }

  saveTask() {
    if (this.createNew) {
      this.tasksService.addTaskTemplate(this.task).then(() => {
        this.taskTemplates$ = this.tasksService.getTaskTemplates();
      })
    } else {
      this.tasksService.updateTaskTemplate(this.task).then(() => {
        this.taskTemplates$ = this.tasksService.getTaskTemplates();
      })
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
