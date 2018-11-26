import { Component, OnInit } from '@angular/core';
import {RewardsService} from '../services/rewards.service';
import {RewardTemplate} from '../interfaces/reward-template';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-rewards',
  templateUrl: './admin-rewards.component.html',
  styles: []
})
export class AdminRewardsComponent implements OnInit {

  rewardTemplates$;
  reward: RewardTemplate;
  createNew: boolean;
  closeResult: string;

  constructor(private rewardsService: RewardsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.rewardTemplates$ = this.rewardsService.getRewardTemplates();
    this.createNew = true;
  }

  deleteReward(rewardId: string) {
    this.rewardsService.deleteRewardTemplate(rewardId).then(() => {
      this.rewardTemplates$ = this.rewardsService.getRewardTemplates();
    })
  }

  setEditReward(reward: RewardTemplate) {
    this.reward = reward;
    this.createNew = false;
  }

  setCreateNew() {
    this.createNew = true;
    this.reward = new RewardTemplate();
  }

  saveReward() {
    if (this.createNew) {
      this.rewardsService.addRewardTemplate(this.reward).then(() => {
        this.rewardTemplates$ = this.rewardsService.getRewardTemplates();
      })
    } else {
      this.rewardsService.updateRewardTemplate(this.reward).then(() => {
        this.rewardTemplates$ = this.rewardsService.getRewardTemplates();
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
