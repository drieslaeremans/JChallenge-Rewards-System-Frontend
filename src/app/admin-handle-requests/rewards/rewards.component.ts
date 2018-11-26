import { Component, OnInit } from '@angular/core';
import {UserRequestService} from '../../services/user-request.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styles: []
})
export class RewardsComponent implements OnInit {

  rewardLijst$;

  constructor(private urService: UserRequestService) { }

  ngOnInit() {
    this.rewardLijst$ = this.urService.getAllUsersRewards();
  }

  rewardGoedkeuren(rewardId) {
    if (confirm('Heb je deze reward bezorgd?')) {
      this.urService.approveReward(rewardId).then(() => {
        this.rewardLijst$ = this.urService.getAllUserRewards();
      })
    }
  }
}
