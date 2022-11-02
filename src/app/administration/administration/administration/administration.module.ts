import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { StaffregistrationComponent } from '../../staffregistration/staffregistration.component';
import { StafflistingComponent } from '../../stafflisting/stafflisting.component';
import { StaffDetailsComponent } from '../../staff-details/staff-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from '../../../common-module/common-module/common-module.module';

import { DynamicNestedFormModule } from '../../../dynamic-nested-form/dynamic-nested-form.module';
import { DynamicFormModule } from '../../../dynamic-form/dynamic-form/dynamic-form.module';
import { AddProductComponent } from '../../add-product/addproduct.component';

@NgModule({
  declarations: [
    StaffregistrationComponent,
    StafflistingComponent,
    StaffDetailsComponent,
    AddProductComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,DynamicNestedFormModule,
    ReactiveFormsModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
