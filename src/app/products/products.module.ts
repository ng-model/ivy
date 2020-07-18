import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { DeployComponent } from './deploy/deploy.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    HomeComponent,
    InventoryComponent,
    DeployComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    ProductsRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsModule { }
