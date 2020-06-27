import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { FpasswordComponent } from './fpassword/fpassword.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: SignupComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: FpasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
