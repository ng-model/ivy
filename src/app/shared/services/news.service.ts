import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class NewsService {
    constructor(public toastr: ToastrService, public http: HttpClient, private afs: AngularFirestore) { }

    key = environment.apiKey;

    getNews(country) {
        return this.http.get('https://newsapi.org/v2/top-headlines?country=' + `${country}` + '&apiKey=' + `${this.key}`)
    }

    offlineNews(news) {
        return this.afs.collection('news').add(news);
    }

    getNews1() {
        return this.afs.collection('news').snapshotChanges();
    }

}