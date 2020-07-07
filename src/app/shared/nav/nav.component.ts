import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  date; time;
  user: any;
  myDisplay: any;
  itemsInCart: any[];
  totalItems: number;

  constructor(public authService: AuthService, private toastr: ToastrService, private router: Router, private cartService: ProductService) {
    setInterval(() => {
      this.time = moment().format('LTS');
    }, 1);
    this.showCart();
  }

  ngOnInit(): void {
    this.date = moment().format('dddd');
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.myDisplay = this.user.photoURL;
    }
  }

  showCart() {
    this.cartService
      .getCartItems().subscribe(products => {
        this.itemsInCart = products;
        this.totalItems = this.itemsInCart.length;
      });
  }

}
