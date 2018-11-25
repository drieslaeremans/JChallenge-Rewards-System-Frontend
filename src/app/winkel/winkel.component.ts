import { Component, OnInit } from '@angular/core';
import {RewardsService} from '../services/rewards.service';
import {UserRequestService} from '../services/user-request.service';
import {TargetService} from '../services/target.service';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {RewardTemplate} from '../interfaces/reward-template';

@Component({
  selector: 'app-winkel',
  templateUrl: './winkel.component.html',
  styles: []
})
export class WinkelComponent implements OnInit {
  rewards$;
  user: User;

  constructor(private rewardsService: RewardsService, private userRequestService: UserRequestService,
              private targetService: TargetService, public authService: AuthService) {
  }

  ngOnInit() {
    this.rewards$ = this.rewardsService.getRewardTemplates();
    this.authService.userData$.subscribe(data => this.user = data);
  }

  koop(reward: RewardTemplate) {
    if (confirm('Wil je je punten inwisselen voor deze prijs?')) {
      console.log(reward);
      const userPunten = this.userRequestService.addUserReward(reward);
      console.log('userPunten', userPunten);
      this.user.punten = (this.user.punten - reward.points);
      this.authService.changePoints(this.user);
    }
  }

  addTarget(id) {
    if (confirm('Wilt u dit als target instellen?')) {
      this.targetService.setUserTarget(id);
      console.log('added reward with id: ', id, ' as target');
    }
  }
}
