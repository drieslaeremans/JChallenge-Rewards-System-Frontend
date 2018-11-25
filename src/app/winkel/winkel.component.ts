import { Component, OnInit } from '@angular/core';
import {RewardsService} from '../services/rewards.service';
import {UserRequestService} from '../services/user-request.service';
import {TargetService} from '../services/target.service';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-winkel',
  templateUrl: './winkel.component.html',
  styles: []
})
export class WinkelComponent implements OnInit {
  rewards$;
  reward;
  user: User;

  constructor(private rewardsService: RewardsService, private userRequestService: UserRequestService,
              private targetService: TargetService, public authService: AuthService) {
  }

  ngOnInit() {
    this.rewards$ = this.rewardsService.getRewardTemplates();
    this.authService.userData$.subscribe(data => this.user = data);
  }

  private koop(id) {
    this.reward = this.rewardsService.getRewardTemplateById(id);
    this.userRequestService.addUserReward(this.reward);
    console.log('bought reward with id: ', id);
  }

  addTarget(id) {
    if (confirm('Wilt u dit als target instellen?')) {
      this.targetService.setUserTarget(id);
      console.log('added reward with id: ', id, ' as target');
    }
  }
  open(id) {
    if (confirm('Wil je deze punten wisselen?')) {
      this.koop(id);
    }
  }
}
