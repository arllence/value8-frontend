
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig} from '../../dynamic-form/interface/dynamic-interface';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { AdministrationService } from '../services/administration.service';
import { list_user_roles, create_user_url} from '../../app.constants';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';

@Component({
  selector: 'app-staffregistration',
  templateUrl: './staffregistration.component.html',
  styleUrls: ['./staffregistration.component.css']
})

export class StaffregistrationComponent {
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  user_roles_list: [] = [];
  language = [
    {"id":"English","name":"English"},
    {"id":"French","name":"French"},
    {"id":"Portuguese","name":"Portuguese"},
  ];
  constructor( public administrationService: AdministrationService, public sweetalertService: SweetalertService,
    public toastService: ToastService, public loadingService: LoadingService) {


  }
  ngOnInit() {


  }
  ngAfterViewInit() {
    this.fetchallroles();
    this.populateform();
}

 fetchallroles() {
   const payload = {
   };
   this.administrationService.getrecords(list_user_roles, payload).subscribe((res) => {
     for (const record of res) {
      this.user_roles_list.push(record);
     }
     console.log(this.user_roles_list)
   });
 }

  registeruser() {
    const payload = this.inputForm.value;
    this.sweetalertService.showConfirmation('','Do You Wish to proceed?').then((res) => {

      if (res === false) {
        this.toastService.showToastNotification('warning','User Cancelled Action','');

      } else {
        this.loadingService.showloading();
        this.administrationService.postrecord(create_user_url, payload).subscribe((res) => {
          if (res) {
            this.sweetalertService.showAlert('Success','User Created Successfully. Password: ' + res['password'],'success');
            this.inputForm.resetForm();
            this.loadingService.hideloading();
          }
          this.loadingService.hideloading();
        });


      }

    });

  }

  populateform() {
      const new_config = [
        {
          field_type: 'input',
          label: 'Email',
          input_type: 'email',
          name: 'email',
          width: 6,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'Email is Required'
            }
          ]
        },
        {
          field_type: 'input',
          label: 'First Name',
          input_type: 'text',
          name: 'first_name',
          width: 6,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'First Name is Required'
            }
          ]
        },
        {
          field_type: 'input',
          label: 'Last Name',
          input_type: 'text',
          name: 'last_name',
          width: 6,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'Last Name is Required'
            }
          ]
        },
        {
          field_type: 'select',
          label: 'User Role',
          name: 'role_name',
          width: 6,
          options: this.user_roles_list,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: ' Role is Required'
            }
          ]
        },
        {
          field_type: 'select',
          label: 'Language',
          name: 'language',
          width: 6,
          options: this.language,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: ' Language is Required'
            }
          ]
        },
        {
          field_type: 'input',
          label: 'No. of Assigned Applications',
          input_type: 'number',
          name: 'assigned',
          width: 6,
        },
        {
          field_type: 'button',
          width: 6,
          label: 'Save'
        }
      ];
      this.inputForm.initialize_form(new_config);



    // this.inputForm.resetForm();


}
}

