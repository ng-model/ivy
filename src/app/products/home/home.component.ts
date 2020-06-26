import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent implements OnInit {
  title = 'ivy';
  constructor() { }

  ngOnInit(): void {
  }

}
