import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig} from '../interface/dynamic-interface';
@Component({
  selector: 'app-dynamic-radio',
  template: `
     <div class="col-md-9 col-form-label">
                          <div class="form-check form-check-inline mr-1" id="inline-radios">
                            <input class="form-check-input" type="radio" readonly [formGroup]="group"
                              id="inlineRadio1">
                            <label class="form-check-label" for="inlineRadio1">Yes</label>
                          </div>
                          <div class="form-check form-check-inline mr-1">
                            <input class="form-check-input" type="radio" readonly name="isregisteredforspotcash"
                              id="inlineRadio2" value="no">
                            <label class="form-check-label" for="inlineRadio2">No</label>
                          </div>
                        </div>
  `,
  styles: []
})
export class DynamicRadioComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
