import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApplicationModuleRoutingModule } from './application-routing.module';
// import { TagInputModule } from 'ngx-chips';
// import { QuillModule } from 'ngx-quill'
// import { ChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { ApplicationComponent } from '../application.component';
import { SharedModule } from '../../../common-module/common-module/common-module.module';

@NgModule({
  declarations: [
    ApplicationComponent,
  ],

  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    // BsDatepickerModule,
    // DynamicFormModule,
    // DynamicNestedFormModule,
    ReactiveFormsModule,
    ApplicationModuleRoutingModule,

    // TagInputModule,
    // QuillModule,
    // ChartsModule,
    NgxPrintModule,
    AccordionModule
  ]
})
export class ApplicationModule { }

