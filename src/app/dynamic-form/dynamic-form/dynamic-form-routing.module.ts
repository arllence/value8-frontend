import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicFormRoutingModule { }
