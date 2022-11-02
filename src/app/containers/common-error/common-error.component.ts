
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldValidationService } from '../../common-module/services/field-validation.service';
 
@Component({
  selector: 'error-message',
  templateUrl: './common-error.component.html',
  styleUrls: ['./common-error.component.css']
})
export class CommonErrorComponent {
  @Input() control: FormControl;
 
  constructor() { }
   
  get errorMessage() {
    let control_names = [];
    let count = 0;
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        // console.log(this.control);
        // console.log(this.control.root.value);
        for(let controlName in this.control.root.value){
          control_names.push(controlName);
        }

        return FieldValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName], control_names[count]);
      }
      count = count + 1;

    }    
    
    return null;
  }
}