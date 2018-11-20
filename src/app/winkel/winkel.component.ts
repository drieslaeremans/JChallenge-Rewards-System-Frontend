import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-winkel',
  templateUrl: './winkel.component.html',
  styles: []
})
export class WinkelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  koop() {
    console.log("Your purchase has been registered");
  }

}
