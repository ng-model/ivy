import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent implements OnInit {
  title = 'ivy';
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

}
