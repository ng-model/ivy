import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../shared/services/news.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsThread: any;
  rawData: any;
  select = 'Select';
  newsThread1: any;
  constructor(private news: NewsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    const country = 'us';
    this.myNews(country);
  }

  myNews(country) {
    this.news.getNews(country).subscribe(data => {
      this.rawData = data;
      this.newsThread = this.rawData.articles;
      this.newsThread.sort((a: any, b: any) => (b.publishedAt - a.publishedAt));
      this.news.offlineNews(this.rawData);
    },
      (err: any) => {
        console.log(err);
        this.toastr.success(err, 'Warning');
      });
  }

  changeNews(country) {
    this.myNews(country);
    switch (country) {
      case 'br':
        this.select = 'Brazil';
        break;
      case 'in':
        this.select = 'India';
        break;
      case 'au':
        this.select = 'Australia';
        break;
      default:
        this.select = 'Select';
        break;
    }
  }
}
