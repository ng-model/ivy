import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selectedItem: { category: any; createdAt: any; id: any; key: any; price: any; title: any; };
  today: any;
  itemsInCart: Product[];
  totalItems: number;
  dummy: any;

  constructor(
    private productService: ProductService,
    private modal: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.today = moment().format();
  }


  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.getAllProducts();
  }

  getAllProducts() {
    this.dummy = this.productService
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
        }).sort((a: any, b: any) => (b.createdAt - a.createdAt));
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

  delete(id) {
    this.productService.delete(id);
  }

  createForm(): FormGroup {
    return (this.pdtForm = this.fb.group({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      createdAt: this.today
    }));
  }

  open(addItem) {
    this.createForm();
    this.modal.open(addItem, { ariaLabelledBy: 'modal-additem' }).result.then((result) => {
      this.create(this.pdtForm.value);
    }, (reason) => {

    });
  }

  edit(item, itemDetail) {
    this.createForm();
    this.selectedItem = {
      category: item.category,
      createdAt: item.createdAt,
      id: item.id || 2345,
      key: item.key,
      price: item.price,
      title: item.title
    }
    this.pdtForm.patchValue({
      id: this.selectedItem.id,
      title: this.selectedItem.title,
      price: this.selectedItem.price,
      category: this.selectedItem.category,
      // imageUrl: this.selectedItem.id,
      createdAt: moment().format()
    })
    this.modal.open(itemDetail, { ariaLabelledBy: 'modal-detail' }).result.then((result) => {
      this.productService.update(this.selectedItem.key, this.pdtForm.value);
      console.log(this.pdtForm.value);
    }, (reason) => {

    });
  }

  addToCart(item) {
    this.selectedItem = {
      category: item.category,
      createdAt: item.createdAt,
      id: item.id || 2345,
      key: item.key,
      price: item.price,
      title: item.title
    }
    this.productService.addItemToCart(this.selectedItem);
    this.productService.getCartItems().subscribe();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.dummy.unsubscribe();
  }

}