import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicNestedFormComponent } from './dynamic-nested-form/dynamic-nested-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeysPipe } from '../common-module/shared-pipes/key.pipe';
import { CollapseModule } from 'ngx-bootstrap/collapse';
@NgModule({
  declarations: [DynamicNestedFormComponent, KeysPipe],

  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,CollapseModule
  ],
  exports: [DynamicNestedFormComponent, KeysPipe],
})
export class DynamicNestedFormModule { }
