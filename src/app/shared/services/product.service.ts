import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

    constructor(private db: AngularFirestore) { }

    create(product: Product) {
        return this.db.collection('products').add(product);
    }

    getAll() {
        return this.db.collection('products').snapshotChanges();
    }

    get(productId: any) {
        return this.db.collection('products').doc(productId);
    }

    update(productId: any, product: Product) {
        return this.db.doc('products/' + productId).update(product);
    }

    delete(productId: any) {
        return this.db.doc('products/' + productId).delete();
    }

    addItemToCart(product: Product) {
        return this.db.collection('cart').add(product);
    }

    getCartItems() {
        return this.db.collection('cart').snapshotChanges();
    }

    deleteCartItem(key) {
        return this.db.doc('cart/' + key).delete();
    }
}