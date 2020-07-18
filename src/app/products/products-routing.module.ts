import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeployComponent } from './deploy/deploy.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'gh-pages-deploy', component: DeployComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'itemsInCart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
