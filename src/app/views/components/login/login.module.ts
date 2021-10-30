import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QCommonModule } from '../common/common.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,ReactiveFormsModule,
    QCommonModule,
    NgxTrimDirectiveModule
  ],
  exports:[NgxTrimDirectiveModule]
})
export class LoginModule { }
