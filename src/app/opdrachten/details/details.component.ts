import {Component, Input, OnInit} from '@angular/core';
import {TaskTemplate} from '../../interfaces/task-template';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent implements OnInit {

  @Input() taak: TaskTemplate;

  constructor() { }

  ngOnInit() {

  }

  taakToevoegen(description: string) {
    this.taak.description = description;
  }

}
