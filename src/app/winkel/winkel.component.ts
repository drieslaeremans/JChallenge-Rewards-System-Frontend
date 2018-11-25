import { Component, OnInit } from '@angular/core';
import {RewardsService} from '../services/rewards.service';
import {UserRequestService} from '../services/user-request.service';

@Component({
  selector: 'app-winkel',
  templateUrl: './winkel.component.html',
  styles: []
})
export class WinkelComponent implements OnInit {
  rewards$;
  reward;

  constructor(private rewardsService: RewardsService, private userRequestService: UserRequestService) {
  }

  ngOnInit() {
    this.rewards$ = this.rewardsService.getRewardTemplates();
  }

  private koop(id) {
    this.reward = this.rewardsService.getRewardTemplateById(id);
    this.userRequestService.addUserReward(this.reward);
    console.log('bought reward with id: ', id);
  }

  addTarget(id) {
    console.log('added reward with id: ', id, ' as target');
  }
  open(id) {
    if (confirm("wil je deze punten wisselen?")){
      this.koop(id);
    }
  }
}
