import { Component, OnInit } from '@angular/core';
import {RewardsService} from '../services/rewards.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-winkel',
  templateUrl: './winkel.component.html',
  styles: []
})
export class WinkelComponent implements OnInit {
  rewards$;
  closeResult: string;

  constructor(public rewardsService: RewardsService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.rewards$ = this.rewardsService.getRewardTemplates();
  }

  koop(id) {
    console.log('bought reward with id: ', id);
  }

  addTarget(id) {
    console.log('added reward with id: ', id, ' as target');
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
