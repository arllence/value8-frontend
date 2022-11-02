import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig} from '../interface/dynamic-interface';
@Component({
  selector: 'app-dynamic-select',
  template: `
  <form [formGroup]="group">
    <div class="form-group col-md-{{field.width}}">
    <label>{{field.label | titlecase}} </label>
                                  <select class="form-control" [formControlName]="field.name">
                                  <option *ngFor="let item of field.options" [value]="item.id">{{item.name}}</option>
                                  
                                </select>
                                </div>
    </form>                          
  `,
  styles: []
})
export class DynamicSelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
