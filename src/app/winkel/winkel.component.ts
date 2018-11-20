import { Component, OnInit } from '@angular/core';
import {RewardsService} from '../services/rewards.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-winkel',
  templateUrl: './winkel.component.html',
  styles: []
})
export class WinkelComponent implements OnInit {
  rewards$: Observable<any>;
  constructor(public rewardsService: RewardsService) {
  }

  ngOnInit() {
  }

  koop() {
    console.log(this.rewardsService.getRewardTemplates());
  }

}
