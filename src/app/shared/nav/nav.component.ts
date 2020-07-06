import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

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

  constructor(public authService: AuthService, private toastr: ToastrService, private cartService: ProductService) {
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
    this.showCart();
  }

  showCart() {
    this.cartService
      .getCartItems().subscribe(products => {
        this.itemsInCart = products.map((e: any) => {
          return {
            key: e.payload.doc.id,
            id: e.payload.doc.data()['key'],
            title: e.payload.doc.data()['title'],
            price: e.payload.doc.data()['price'],
            category: e.payload.doc.data()['category'],
            createdAt: e.payload.doc.data()['createdAt']
          } as Product;
        });
        this.totalItems = this.itemsInCart.length;
      });

  }

}
