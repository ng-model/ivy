import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NewsComponent } from './news/news.component';


@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NewsRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsModule { }
