
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldConfig} from '../../dynamic-form/interface/dynamic-interface';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { AdministrationService } from '../services/administration.service';
import { list_user_roles, create_user_url, fetch_groups_url, fetch_top50_unassigned_url, fetch_user_roles_url, create_groups_url} from '../../app.constants';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';

@Component({
  selector: 'app-jury-groups',
  templateUrl: './jury-groups.component.html',
  styleUrls: ['./jury-groups.component.css']
})

export class JuryGroupsComponent {
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  user_roles_list: [] = [];
  languages = [
    {"id":"English","name":"English"},
    {"id":"French","name":"French"},
    {"id":"Portuguese","name":"Portuguese"},
  ];
  registerForm: FormGroup;
  is_other_group: boolean = false;
  groups = [];
  applications: any;
  user_list: any;
  constructor(private formBuilder: FormBuilder, public administrationService: AdministrationService, public sweetalertService: SweetalertService,
    public toastService: ToastService, public loadingService: LoadingService) {
      this.registerForm = this.formBuilder.group({
        group: new FormControl('',Validators.compose([Validators.required])),  
        language: new FormControl('',Validators.compose([Validators.required ])),  
        role: new FormControl('',Validators.compose([Validators.required])),             
        applications: new FormControl('',Validators.compose([Validators.required])),             
        assignees: new FormControl('',Validators.compose([Validators.required])),             
      });
  }
  ngOnInit() {
    this.fetchGroups();
    // this.fetchUnassigned();
    // this.fetchUserRoles()
  }
  ngAfterViewInit() {
    this.fetchallroles();
    // this.populateform();
}

  switcher(event){
    if (event == 'other') {
      this.is_other_group = true;
    }
  }

 fetchallroles() {
   const payload = {
   };
   this.administrationService.getrecords(list_user_roles, payload).subscribe((res) => {
     for (const record of res) {
      this.user_roles_list.push(record);
     }
    //  console.log(this.user_roles_list)
   });
 }

  fetchGroups() {
    const payload = {
    };
    this.administrationService.getrecords(fetch_groups_url, payload).subscribe((res) => {
      this.groups = res
      // console.log(res)
    });
  }

  fetchUnassigned(lang) {
    const payload = {
      "language": lang
    };
    this.administrationService.getrecords(fetch_top50_unassigned_url, payload).subscribe((res) => {
      this.applications = res
      // console.log(res)
    });
  }

  fetchUserRoles(role) {
    const payload = {
      "role" : role
    };
    this.administrationService.getrecords(fetch_user_roles_url, payload).subscribe((res) => {
      this.user_list = res
      console.log(res)
    });
  }

  registeruser() {
    const payload = this.registerForm.value;
    console.log(payload)
    this.sweetalertService.showConfirmation('','Do You Wish to proceed?').then((res) => {

      if (res === false) {
        this.toastService.showToastNotification('warning','User Cancelled Action','');

      } else {
        this.loadingService.showloading();
        this.administrationService.postrecord(create_groups_url, payload).subscribe((res) => {
          if (res) {
            this.sweetalertService.showAlert('Success','Created Successfully.','success');
            this.registerForm.reset();
            this.loadingService.hideloading();
          }
          this.loadingService.hideloading();
        });

      }

    });

  }
}

