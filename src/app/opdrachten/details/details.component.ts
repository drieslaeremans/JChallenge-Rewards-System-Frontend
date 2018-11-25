import {Component, Input, OnInit} from '@angular/core';
import {TaskTemplate} from '../../interfaces/task-template';
import {UserRequestService} from '../../services/user-request.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent implements OnInit {

  @Input() taak: TaskTemplate;

  constructor(private urService: UserRequestService) { }

  ngOnInit() {

  }

  taakToevoegen(description: string) {
    this.taak.description = description;
    this.urService.addUserTask(this.taak);

    alert('De taak is toegevoegd. De administrator zal deze nu behandelen.');
    this.taak = null;
  }

}
