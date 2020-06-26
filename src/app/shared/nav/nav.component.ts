import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../shared/services/auth.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  date; time;
  user: any;
  myDisplay: any;
  subscription: any;

  constructor(public authService: AuthService) {
    setInterval(() => {
      this.time = moment().format('LTS');
    }, 1);
    this.subscription = this.authService.getUserInfo().subscribe(data => { this.user = data; });
  }

  ngOnInit(): void {
    this.date = moment().format('dddd');
    console.log(this.user);
    if (this.user) {
      this.myDisplay = this.user.photoURL;
    }
  }

}
