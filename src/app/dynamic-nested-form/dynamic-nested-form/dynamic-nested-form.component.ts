
import { Component, ViewChild, EventEmitter, Output, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../common-module/shared-service/toast.service';

@Component({
  selector: 'dynamic-nested-form',
  templateUrl: './dynamic-nested-form.component.html',
  styleUrls: ['./dynamic-nested-form.component.scss']
})
export class DynamicNestedFormComponent implements OnInit {
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  filterForm: FormGroup;
  main_form_name: any;
  form_fields_passed = [];
  document_fields = {};
  public isCollapsed: boolean[] = [];

  constructor(private fb: FormBuilder, public toastService: ToastService) {
  }

  create_form() {

  }
  ngOnInit() {
    this.filterForm = this.fb.group({});


    // this.update_form_values(patchvalues)

  }
  update_form_values(patchvalues) {


    for (const xitem in patchvalues) {
      try {
        const object_key = xitem;

        const object_type = patchvalues[xitem];
        const is_array = Array.isArray(object_type);
        if (is_array) {
          const form_array_items = [];

          for (const arrayitems in object_type) {
            this.add_control(object_key);
            const selecteditems = object_type[arrayitems];
            form_array_items.push(selecteditems);

          }
          const form_data = { [object_key]: form_array_items };

          this.filterForm.patchValue(form_data);
        } else {
          const form_data = { [object_key]: object_type };
          this.filterForm.patchValue(form_data);

        }

      } catch (error) {
        console.log(error);
      }
      
    }

  }
  showform(document_fields) {
    this.filterForm = this.populate_form(document_fields);

  }
  populate_form(sample_documents): FormGroup {
    const baseForm = this.fb.group({

    });



    const main_form = sample_documents['formgroup'];
    this.main_form_name = main_form;
    const document_fields = sample_documents['forms'];
    this.form_fields_passed = sample_documents['forms'];
    for (let i = 0; i < document_fields.length; i++) {
      const form_section_name = document_fields[i]['formname'];
      const form_section_type = document_fields[i]['formtype'];
      const form_section_fields = document_fields[i]['fields'];
      const multipleForm = this.fb.array([]);
      if (form_section_type == 'single') {
        const singleForm = this.fb.group({});
        for (let s = 0; s < form_section_fields.length; s++) {
          singleForm.addControl(form_section_fields[s]['field_name'], new FormControl(''));
          const formvalue = form_section_fields[s]['field_value'];
          const form_data = { [form_section_fields[s]['field_name']]: formvalue };
          baseForm.addControl(form_section_name, singleForm);

        }
      } else if (form_section_type == 'array') {
        const multlipleFormControl = this.fb.group({});
        for (let m = 0; m < form_section_fields.length; m++) {
          multlipleFormControl.addControl(form_section_fields[m]['field_name'], new FormControl(''));
          const formfield = form_section_fields[m]['field_name'];
          const formvalue = form_section_fields[m]['field_value'];
        }
        multipleForm.controls.push(multlipleFormControl);
        baseForm.addControl(form_section_name, multipleForm);
      }

    }
    baseForm.reset();
    return baseForm;
  }
  populate_multiple_dynamic_form(document_fields): FormGroup {
    const baseForm = this.fb.group({});
    const singleForm = this.fb.group({});
    for (let m = 0; m < document_fields.length; m++) {
      singleForm.addControl(document_fields[m]['field_name'], new FormControl(''));
    }



    return singleForm;
  }
  remove_control(index, form_control) {
    const selectedformArray = this.filterForm.get(form_control) as FormArray;
    const arrLength = selectedformArray.length;
    selectedformArray.removeAt(index);
    this.toastService.showToastNotification('success', 'Deleted', '');
  }
  productArray(form_name): FormArray {
    const form_array = this.filterForm.get(form_name) as FormArray;

    // form_array.removeAt(0);
    return form_array;
  }





  add_control(index) {

    const selectedformArray = this.filterForm.get(index) as FormArray;
    const matchedIndex = this.form_fields_passed.map(function (obj) { return obj.formname; }).indexOf(index);
    const selected_index = this.form_fields_passed[matchedIndex];

    const selected_index_fields = selected_index['fields'];
    const new_form = this.populate_multiple_dynamic_form(selected_index_fields);
    selectedformArray.push(new_form);

  }
  // onSubmit(event: Event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   if (this.filterForm.valid) {
  //     this.submit.emit(this.filterForm.value);
  //   } else {
  //     this.toastService.showToastNotification('error','Kindly correct the errors highlighted','');
  //     this.validateAllFormFields(this.filterForm);
  //   }
  // }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      // control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

}
