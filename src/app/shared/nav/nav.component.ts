import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  date; time;
  user: any;
  myDisplay: any;

  constructor(public authService: AuthService) {
    setInterval(() => {
      this.time = moment().format('LTS');
    }, 1);
  }

  ngOnInit(): void {
    this.date = moment().format('dddd');
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.myDisplay = this.user.photoURL;
    }
  }

}
