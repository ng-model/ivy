import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  product: any;
  constructor(private productService: ProductService, private modal: NgbModal) { }

  ngOnInit(): void {
    // this.productService.get(5);
    this.getAllProducts();
  }

  private getAllProducts() {
    this.productService
      .getAll().subscribe(products => {
        this.products = products.map((e: any) => {
          return {
            key: e.payload.doc.id,
            id: e.payload.doc.data()['key'],
            title: e.payload.doc.data()['title'],
            price: e.payload.doc.data()['price'],
            category: e.payload.doc.data()['category'],
            imageUrl: e.payload.doc.data()['imageUrl'],
          } as Product;
        })
      });
  }

  create(product: Product) {
    this.productService.create(product);
  }

  update(productId, product: Product) {
    this.productService.update(productId, product);
  }

  delete(id: string) {
    this.productService.delete(id);
  }

  ngOnDestroy(): void {
    // this.productService.getAll().unSubscribe();
  }
}
