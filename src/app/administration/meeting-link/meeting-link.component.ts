
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig} from '../../dynamic-form/interface/dynamic-interface';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { AdministrationService } from '../services/administration.service';
import { list_user_roles, create_user_url, create_meeting_url, fetch_meeting_url, delete_meeting_url} from '../../app.constants';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';

@Component({
  selector: 'app-meeting-link',
  templateUrl: './meeting-link.component.html',
  styleUrls: ['./meeting-link.component.css']
})

export class MeetingLinkComponent {
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  user_roles_list: [] = [];
  links = [];
  constructor( public administrationService: AdministrationService, public sweetalertService: SweetalertService,
    public toastService: ToastService, public loadingService: LoadingService) {


  }
  ngOnInit() {


  }
  ngAfterViewInit() {
    this.fetchMeetings();
    this.populateform();
}

 fetchMeetings() {
   const payload = {
   };
   this.administrationService.getrecords(fetch_meeting_url, payload).subscribe((res) => {
     this.links = res;
   });
 }

  submit() {
    const payload = this.inputForm.value;
    this.sweetalertService.showConfirmation('','Do you wish to proceed Creating?').then((res) => {

      if (res === false) {
        this.toastService.showToastNotification('warning','User Cancelled Action','');

      } else {
        this.loadingService.showloading();
        this.administrationService.postrecord(create_meeting_url, payload).subscribe((res) => {
          if (res) {
            this.fetchMeetings();
            this.sweetalertService.showAlert('Success','Link Created Successfully','success');
            this.inputForm.resetForm();
            this.loadingService.hideloading();
          }
          this.loadingService.hideloading();
        });


      }

    });

  }

  deleteMeeting(link_id) {
    const payload = {
      "request_id": link_id
    }
    this.sweetalertService.showConfirmation('','Do you wish to proceed Deleting?').then((res) => {

      if (res) {
        this.loadingService.showloading();
        this.administrationService.postrecord(delete_meeting_url, payload).subscribe((res) => {
          if (res) {
            this.fetchMeetings();
            this.sweetalertService.showAlert('Success','Link Deleted Successfully','success');
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
          label: 'Meeting Link',
          input_type: 'text',
          name: 'link',
          width: 6,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'Meeting link required'
            }
          ]
        },
        {
          field_type: 'input',
          label: 'Meeting Password',
          input_type: 'text',
          name: 'password',
          width: 6,
          validations: [
            
          ]
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

