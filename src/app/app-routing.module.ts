import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ErrorComponent } from './shared/error/error.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'products',
    component: LayoutComponent,
    loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
