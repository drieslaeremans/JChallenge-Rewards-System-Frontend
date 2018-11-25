import {Component, Input, OnInit} from '@angular/core';
import {TargetService} from '../../services/target.service';
import {RewardTemplate} from '../../interfaces/reward-template';
import {RewardsService} from '../../services/rewards.service';
import {Observable} from 'rxjs';
import {Target} from '../../interfaces/target';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styles: []
})
export class TargetComponent implements OnInit {

  targetReward: Target;
  @Input() userPunten: number;

  constructor(private targetService: TargetService, private rewardsService: RewardsService) { }

  ngOnInit() {
    this.targetReward = this.targetService.getUserTarget();
    console.log(this.targetReward);
  }

  berekenProcent() {
    const procent = (this.userPunten / this.targetReward.target) * 100;
    return procent;
  }

}