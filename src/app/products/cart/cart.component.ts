import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  itemsInCart: any[];
  totalItems: number;
  totalAtCheckout: any;
  constructor(private toastr: ToastrService, private cartService: ProductService) { }

  ngOnInit(): void {
    this.cartService
      .getCartItems().subscribe(products => {
        this.itemsInCart = products.map((e: any) => {
          return {
            key: e.payload.doc.id,
            id: e.payload.doc.data()['key'],
            title: e.payload.doc.data()['title'],
            price: e.payload.doc.data()['price'],
            imageUrl: e.payload.doc.data()['imageUrl'],
            category: e.payload.doc.data()['category'],
            createdAt: e.payload.doc.data()['createdAt']
          } as Product;
        });
        this.totalItems = this.itemsInCart.length;
        const prices = [];
        this.itemsInCart.forEach(x => {
          prices.push(x.price);
        })
        this.totalAtCheckout = prices.reduce((a, b) => (a + b));
        console.log(this.totalAtCheckout);
      });
  }

  delete(key) {
    this.cartService.deleteCartItem(key);
    this.toastr.success('Item removed from cart.', 'Succcess', { timeOut: 1000 });
  }
}
