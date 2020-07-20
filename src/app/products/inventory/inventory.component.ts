import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  products: Observable<Product[]>;
  product: any;
  totalProducts: number;
  pdtForm = new FormGroup({});
  selectedItem: { key: any; category: any; createdAt: any; id: any; imageUrl: any; price: any; title: any; };
  productTitle = [
    { name: "Apples", url: "https://source.unsplash.com/300x300/?fruit?apples" },
    { name: "Apricots", url: "https://source.unsplash.com/300x300/?fruit?apricots" },
    { name: "Bananas", url: "https://source.unsplash.com/300x300/?fruit?bananas" },
    { name: "Grapes", url: "https://source.unsplash.com/300x300/?fruit?grape" },
    { name: "Mango", url: "https://source.unsplash.com/300x300/?fruit?mango" },
    { name: "Peach", url: "https://source.unsplash.com/300x300/?fruit?peaches" },
    { name: "Pears", url: "https://source.unsplash.com/300x300/?fruit?pears" },
    { name: "Pomegranate", url: "https://source.unsplash.com/300x300/?fruit?pomegranate" },
    { name: "Pineapple", url: "https://source.unsplash.com/300x300/?fruit?pineapple" },
    { name: "Strawberry", url: "https://source.unsplash.com/300x300/?fruit?strawberry" },
  ]
  today: any;
  itemsInCart: Product[];
  totalItems: number;
  productCollection: AngularFirestoreCollection<Product>;

  constructor(
    private productService: ProductService,
    private modal: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private afs: AngularFirestore
  ) {
    this.today = moment().format();
    this.productCollection = afs.collection('products', ref => ref.orderBy("createdAt", "desc"));
  }


  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = this.productCollection.snapshotChanges().pipe(map((a: any) => {
      return a.map(e => {
        const data = e.payload.doc.data() as Product;
        const key = e.payload.doc.id
        return { key, ...data };
      })
    }));
    // this.productService
    //   .getAll().subscribe(products => {
    //     this.products = products.map((e: any) => {
    //       return {
    //         key: e.payload.doc.id,
    //         id: e.payload.doc.data()['id'],
    //         title: e.payload.doc.data()['title'],
    //         price: e.payload.doc.data()['price'],
    //         imageUrl: e.payload.doc.data()['imageUrl'],
    //         category: e.payload.doc.data()['category'],
    //         createdAt: e.payload.doc.data()['createdAt']
    //       } as Product;
    //     });
    //     this.totalProducts = this.products.length;
    //   });
  }

  create(product) {
    // this.productService.create(this.pdtForm.value);
    this.afs.collection('products').add(this.pdtForm.value).then((result) => {
      console.log(result);
      this.toastr.success('Item added to the inventory, and available!', 'Success', {
        timeOut: 1000
      });
    }).catch((error) => {
      console.log(error.message);
      this.toastr.success(error.message, 'Oops!', {
        timeOut: 1000
      });
    })
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

  productSelected(e) {
    let obj = this.productTitle.find((a) => a.name == e);
    this.pdtForm.patchValue({
      title: obj.name,
      imageUrl: obj.url
    })
  }

  open(addItem) {
    this.createForm();
    this.modal.open(addItem, { ariaLabelledBy: 'modal-additem' }).result.then((result) => {
      this.create(this.pdtForm.value);
      console.log(this.pdtForm.value);
    }, (reason) => {

    });
  }

  edit(item, itemDetail) {
    this.createForm();
    this.selectedItem = {
      key: item.key,
      category: item.category,
      createdAt: item.createdAt,
      id: item.id,
      imageUrl: item.imageUrl,
      price: item.price,
      title: item.title
    }
    this.pdtForm.patchValue({
      id: this.selectedItem.id,
      title: this.selectedItem.title,
      price: this.selectedItem.price,
      category: this.selectedItem.category,
      imageUrl: this.selectedItem.imageUrl,
      createdAt: moment().format()
    })
    this.modal.open(itemDetail, { ariaLabelledBy: 'modal-detail' }).result.then((result) => {
      this.afs.doc('products/' + this.selectedItem.key).update(this.pdtForm.value)
        .then((result) => {
          this.toastr.success('Item updated successfully!', 'Success', {
            timeOut: 1000
          });
        }).catch((error) => {
          console.log(error.message);
          this.toastr.success(error.message, 'Oops!', {
            timeOut: 1000
          });
        })
    }, (reason) => {

    });
  }

  addToCart(item) {
    this.selectedItem = {
      key: item.key,
      category: item.category,
      createdAt: item.createdAt,
      id: item.id,
      imageUrl: item.imageUrl,
      price: item.price,
      title: item.title
    }
    this.productService.addItemToCart(this.selectedItem);
    this.productService.getCartItems().subscribe();
  }

}