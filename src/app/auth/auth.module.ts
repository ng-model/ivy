import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FpasswordComponent } from './fpassword/fpassword.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    VerifyEmailComponent,
    FpasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
