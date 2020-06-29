import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  product: any;
  totalProducts: number;
  pdtForm = new FormGroup({});

  constructor(
    private productService: ProductService,
    private modal: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService
      .getAll().subscribe(products => {
        this.products = products.map((e: any) => {
          return {
            key: e.payload.doc.id,
            id: e.payload.doc.data()['key'],
            title: e.payload.doc.data()['title'],
            price: e.payload.doc.data()['price'],
            category: e.payload.doc.data()['category'],
            createdAt: e.payload.doc.data()['createdAt']
          } as Product;
        });
        this.products.sort((a: any, b: any) => (b - a));
        this.totalProducts = this.products.length;
      });
  }

  create(product) {
    this.productService.create(this.pdtForm.value);
    setTimeout(() => {
      this.toastr.success('Item added to the inventory, and available!', 'Success', {
        timeOut: 2000
      });
    }, 1000);
  }

  update(productId, product: Product) {
    this.productService.update(productId, product);
  }

  delete(id: string) {
    this.productService.delete(id);
  }

  createForm(): FormGroup {
    return (this.pdtForm = this.fb.group({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      createdAt: new Date()
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