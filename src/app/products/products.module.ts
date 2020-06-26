import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { DeployComponent } from './deploy/deploy.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';


@NgModule({
  declarations: [
    HomeComponent,
    InventoryComponent,
    DeployComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsModule { }
