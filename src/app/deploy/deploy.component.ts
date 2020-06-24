import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss']
})
export class DeployComponent implements OnInit {
  title = 'gh-pages deploy';
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle() {
    this.titleService.setTitle(this.title);
  }
}
