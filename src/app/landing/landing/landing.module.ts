import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';


import { LandingRoutingModule } from './landing-routing.module';
import { HomePageComponent } from '../home-page/home-page.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../common-module/common-module/common-module.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    SharedModule,
    CommonModule,
    LandingRoutingModule,
    ModalModule,
    NgxPermissionsModule.forChild(),
  ]
})
export class LandingModule { }
