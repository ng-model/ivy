import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  product: any;
  constructor(private productService: ProductService, private modal: NgbModal, private fb: FormBuilder) { }
  pdtForm = new FormGroup({});
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

  create(product) {
    this.productService.create(this.pdtForm.value);
  }

  update(productId, product: Product) {
    this.productService.update(productId, product);
  }

  delete(id: string) {
    this.productService.delete(id);
  }

  createForm(): FormGroup {
    return (this.pdtForm = this.fb.group({
      key: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
    }));
  }

  open(addItem) {
    this.createForm();
    this.modal.open(addItem, { ariaLabelledBy: 'modal-additem' }).result.then((result) => {
      this.create(this.pdtForm.value);
    }, (reason) => {

    });
  }
  ngOnDestroy(): void {
    // this.productService.getAll().unSubscribe();
  }
}
