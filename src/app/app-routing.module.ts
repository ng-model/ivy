import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeployComponent } from './deploy/deploy.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', component: HomeComponent },
  { path: 'gh-pages-deploy', component: DeployComponent },
  { path: 'inventory', component: InventoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
