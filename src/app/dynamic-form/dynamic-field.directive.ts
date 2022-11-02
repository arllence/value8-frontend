import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
  ViewContainerRef
  } from "@angular/core";

import { FieldConfig } from './interface/dynamic-interface';
import { FormGroup } from "@angular/forms";
import { DynamicInputComponent }  from './dynamic-input/dynamic-input.component';
import { DynamicSelectComponent } from './dynamic-select/dynamic-select.component';
import { DynamicRadioComponent } from './dynamic-radio/dynamic-radio.component';
import { DynamicCheckboxComponent } from './dynamic-checkbox/dynamic-checkbox.component';
import { DynamicButtonComponent } from './dynamic-button/dynamic-button.component';
import { DynamicDatepickerComponent } from './dynamic-datepicker/dynamic-datepicker.component';
const componentMapper = {
  input: DynamicInputComponent,
  button: DynamicButtonComponent,
  select: DynamicSelectComponent,
  date: DynamicDatepickerComponent,
  radiobutton: DynamicRadioComponent,
  checkbox: DynamicCheckboxComponent
  };
@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit  {
  componentRef: any;
  @Input() field: FieldConfig;
@Input() group: FormGroup;

  constructor(private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef) { }
    ngOnInit() {
      const factory = this.resolver.resolveComponentFactory(
        componentMapper[this.field.field_type]
        );
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    }

}
