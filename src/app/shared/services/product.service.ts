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
}