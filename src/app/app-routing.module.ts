import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeployComponent } from './deploy/deploy.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', component: HomeComponent },
  { path: 'gh-pages-deploy', component: DeployComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
