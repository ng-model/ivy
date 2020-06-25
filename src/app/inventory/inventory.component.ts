import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
tweet$:Observable;

constructor(http: HttpClient) {
  this.tweet$ = http.get(
    `${environment.apiUrl}/tweets`,
    { responseType: JSON }
  );
}

  ngOnInit(): void {
  }

}
