import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { serverurl,get_complete_profile,create_innovator_due_diligence_url,check_completed_profile, upload_document_url, innovation_skills_url, employment_status_url, create_application_url } from '../../app.constants';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AdministrationService } from '../../administration/services/administration.service';
import { ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Country, State, City }  from 'country-state-city';
// import { element } from 'protractor';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  public ChangePasswordForm: FormGroup;
  applicationForm: FormGroup;
  action_required_menu = false;
  newpasswordFieldType: boolean;
  current_passwordFieldType: boolean;
  confirm_passwordFieldType: boolean;
  fileData: File = null;
  picture_link = null;
  form_type = 'create';
  skills = null
  employment_status = null;
  innovation_skills = null;
  is_primary:any = null;
  selected_states = [];
  all_countries = Country.getAllCountries();
  all_states = State.getAllStates();
  is_underage: boolean = false;
  serverurl = serverurl;
  // active = 1;

  @ViewChild('staticTabs', { static: false}) staticTabs: TabsetComponent
  is_other_enterprise: boolean;
  is_other_role: boolean;
  is_worked_before: boolean;
  is_interllectual_property: boolean;
  due_diligence_data: any;
  is_review: boolean = false;
  business_is_funded: any;


  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 2) {
      changeEvent.preventDefault();
    }
  }


  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {
   
    this.applicationForm = this.formBuilder.group({     
      business_name: new FormControl('',Validators.compose([Validators.required])),      
      business_details: new FormControl('',Validators.compose([Validators.required])),      
      business_start_date: new FormControl('',Validators.compose([Validators.required])),      
      business_registered: new FormControl('',Validators.compose([Validators.required])),      
      business_country: new FormControl('',Validators.compose([Validators.required])),      
      business_city: new FormControl('',Validators.compose([Validators.required])),      
      business_climate_adaptation: new FormControl('',Validators.compose([Validators.required])),      
      business_solution: new FormControl('',Validators.compose([Validators.required])),      
      business_target_customer: new FormControl('',Validators.compose([Validators.required])),      
      business_technical_specifications: new FormControl('',Validators.compose([Validators.required])),      
      business_revenue: new FormControl('',Validators.compose([Validators.required])),      
      business_customers: new FormControl('',Validators.compose([Validators.required])),      
      business_funded: new FormControl('',Validators.compose([Validators.required])),      
      business_funding_type_other: new FormControl('',),      
      business_funding_type: new FormControl('',),      
      business_funding_source: new FormControl('',),      
      business_funding_source_details: new FormControl('',),      
      business_funding_date: new FormControl('',),      
      business_funding_secured: new FormControl('',),           
      business_challenges: new FormControl('',Validators.compose([Validators.required])),      
      business_support: new FormControl('',Validators.compose([Validators.required])),      
      business_additional_info: new FormControl('',Validators.compose([Validators.required])),      
      challenge_knowledge: new FormControl('',Validators.compose([Validators.required])),          
    });

    this.action_required_menu =  this.authenticationService.requiresPasswordChange();
    this.check_completed_profile();
    // this.get_skills();
    // this.get_employment_status();



  }

  business_funded_fn(state){
      this.business_is_funded = state;
  }




  handleFileupload(e,dtype) {
    this.fileData = e.target.files[0];
    const formData  =  new FormData();
    formData.append('document', this.fileData);
    formData.append('documentType', dtype);

    this.administrationService.postrecord(upload_document_url, formData).subscribe((res) => {
      if (res) {
        // this.picture_link = serverurl + res['url_link'];
        // console.log(this.picture_link);
        // this.sweetalertService.showAlert('Success', 'Profile Picture updated', 'success');
      } 
    });
  }

  // get_basic_user_details() {
  //   const details = this.authenticationService.getuserprofileInfo().then((res) => {
  //     console.log(res);
  //     const user_info = {
  //       "email": res['currentemail'],
  //       "first_name": res['first_name'],
  //       "last_name": res['last_name']
  //     }
  //     this.DueDiligenceForm.patchValue(user_info)
  //   });
  // }



  get_states(code){
    console.log(code);
    this.selected_states = State.getStatesOfCountry(code);
    const country = Country.getCountryByCode(code)['name'];
    this.applicationForm.patchValue({'country': country});
  }


  check_completed_profile(){
    const payload = {

    }
    this.administrationService.getrecords(check_completed_profile,payload).subscribe((res) => {
      if(res) {
        console.log(res)
        const status = res['status'];
        if (status) {
          // this.get_complete_profile();
          this.due_diligence_data = res;
          if(this.due_diligence_data.length > 0){

          }
          // this.DueDiligenceForm.patchValue(res['due_diligence'])
        } else {
          this.router.navigate(['/profile']);
        }
      }
    })
  }

 
  submit_application(){
    if (this.applicationForm.valid) {
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submitting application?').then((res) => {
        if (res) {
          const payload = this.applicationForm.value
          console.log(payload);
          this.loadingService.showloading();
          this.administrationService.postrecord(create_application_url, payload).subscribe((res) => {
            if (res) {
              this.applicationForm.reset();
              this.sweetalertService.showAlert('Success', ' Updated Successfully', 'success');
              this.router.navigate(['/landing/home']);
            }
            this.loadingService.hideloading();
          });
        }
      });

    } else {
      console.log(this.applicationForm.value);
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.applicationForm);

    }
  }

  // get_values(controls){
  //   const values = [];
  //   for (const name of controls){
  //     const control = this.DueDiligenceForm.get(name);
  //     if(control.value !== ''){
  //       values.push(control.value);
  //     }
  //   }
  //   if(controls.length !== values.length){
  //     for (const name of controls){
  //       const control = this.DueDiligenceForm.get(name);
  //       if(!control.value.trim() ){
  //         control.markAsDirty({ onlySelf: true });
  //         this.toastService.showToastNotification('error', name.toUpperCase() + ' Is Required', '');
  //       }
  //     }
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  ngOnInit(): void {
  }

}
