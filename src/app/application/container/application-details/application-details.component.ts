import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
// import { serverurl, list_department_url, list_program_url, list_courses_url, create_name_confirmation_url, fetch_graduand_confirmation_url, list_gowns_url, check_can_pick_gowns_url, create_gown_picked_url, list_picked_gowns_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { create_details_url, delete_attachments_url, fetch_countries_url, fetch_details_url, fetch_files_url, serverurl } from '../../../app.constants';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {
  applicationForm: FormGroup;
 
  countries = [];
  records = [];
  fileData: File = null;
  fileDatas = [];
  myFiles:string [] = [];
  max_Length = 650
  isEditable: boolean = true;
  saved_files: any = [];
  serverurl = serverurl
  selected_lang: string = 'en';
 
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {

        this.applicationForm = this.formBuilder.group({
          entity: new FormControl('',Validators.compose([Validators.required])),  
          country_based: new FormControl('',Validators.compose([Validators.required])),  
          organization_name: new FormControl('',Validators.compose([Validators.required])),  
          youth_led: new FormControl('',Validators.compose([Validators.required])),  
          founded: new FormControl('',Validators.compose([Validators.required, Validators.maxLength(this.max_Length) ])),  
          country_registered: new FormControl('',Validators.compose([Validators.required])),  
          registration_files: new FormControl('',),       
          business_majority: new FormControl('',Validators.compose([Validators.required])),       
          staff_size: new FormControl('',Validators.compose([Validators.required])),       
          website: new FormControl('',Validators.compose([Validators.required])),       
          contact_name: new FormControl('',Validators.compose([Validators.required])),       
          contact_email: new FormControl('',Validators.compose([Validators.required])),       
          contact_phone: new FormControl('',Validators.compose([Validators.required])),       
          organization_address: new FormControl('',Validators.compose([Validators.required])),       
          alternative_contact_name: new FormControl('',Validators.compose([Validators.required])),       
          alternative_contact_title: new FormControl('',Validators.compose([Validators.required])),       
          alternative_contact_email: new FormControl('',Validators.compose([Validators.required])),       
          alternative_contact_phone: new FormControl('',Validators.compose([Validators.required])),       
        });
    
        this.fetch_details();
        this.fetch_countries();
        this.fetch_files();
  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.check_language();
  }

  back(){
    this.router.navigate(['/application/eligibility']);
  }
  check_language(){
    const lang =  localStorage.getItem('LOCALE');
    if(lang){
      this.selected_lang = lang;
    }
  }

  handleFileupload(e) {
    // this.fileData = e.target.files[0];
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }
  check(){
    let value = this.applicationForm.get('founded').value
    return value.split(" ").length-1;
    
  }

  CheckLen(event,max,control){
    // c counts the number of words of input value
    const counter = event.target.value.split(' ').length;
    // checks if its above maximum
    if(counter > max){ 
      const form_control = this.applicationForm.get(control)
      form_control.setErrors({'max_length': true})
    }
  }

  fetch_countries() {
    const payload = {
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_countries_url, payload).subscribe((res) => {
      if (res) {
        this.countries = res;
        this.loadingService.hideloading();
      }

    });
  }
  fetch_files() {
    const payload = {
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_files_url, payload).subscribe((res) => {
      if (res) {
        this.saved_files = res; 
        console.log(res)
        this.loadingService.hideloading();
      }

    });
  }
  delete_file(file_id) {
    const payload = {
      "file_id": file_id
    }
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting file? This process is irreversible').then((res) => {
        if (res) {
          this.loadingService.showloading();
        this.administrationService.postrecord(delete_attachments_url, payload).subscribe((res) => {
          if (res) {
            this.fetch_files();
            this.toastService.showToastNotification('success', 'Successfully Deleted','');
            this.loadingService.hideloading();
          }
        });
        }
      });
  }


  fetch_details() {
    const payload = {
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_details_url, payload).subscribe((res) => {
      if (res) {
        this.records = res;
        console.log(res)
        if (res.length != 0) {
          this.records['registration_files'] = '';
          this.applicationForm.patchValue(this.records);
        } else {
          
        }
        console.log(res)
        this.loadingService.hideloading();
      }

    });
}

save_data() {
  if (this.applicationForm.valid) {
    // this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed creating record?').then((res) => {
    //   if (res) {
        const payload =  this.applicationForm.value
        this.loadingService.showloading();
        const formData  =  new FormData();
        for (var i = 0; i < this.myFiles.length; i++) { 
          formData.append("documents", this.myFiles[i]);
        }
        formData.append('form_value', JSON.stringify(payload));
        this.administrationService.postrecord(create_details_url, formData).subscribe((res) => {
          if (res) {
            this.router.navigate(['/application/proposal']);
            this.loadingService.hideloading();
          }
        });
    //   }
    // });
  } else {
    this.toastService.showToastNotification('error', 'Please correct errors','');
    this.administrationService.markFormAsDirty(this.applicationForm);
    this.loadingService.hideloading();
  }
}




}
