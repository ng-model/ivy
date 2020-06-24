import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  date; time;
  constructor() {
    setInterval(() => {
      this.time = moment().format('LTS');
    }, 1);
  }

  ngOnInit(): void {
    this.date = moment().format('dddd'); 
  }

}
