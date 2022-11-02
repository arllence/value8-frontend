import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent  } from '../login/login.component';
import { SharedModule } from '../../common-module/common-module/common-module.module';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ],
})
export class AuthenticationModule { }
