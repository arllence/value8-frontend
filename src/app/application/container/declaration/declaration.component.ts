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
import { create_declaration_url, fetch_declaration_url } from '../../../app.constants';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {
  applicationForm: FormGroup;
  records = [];
  fileData: File = null;
  selected_lang: string = 'en';
 

 
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {

        this.applicationForm = this.formBuilder.group({
          terms: new FormControl('',Validators.compose([Validators.required])),  
          eligibility: new FormControl('',Validators.compose([Validators.required])),  
          correctness: new FormControl('',Validators.compose([Validators.required])),     
        });

        this.fetch_data()
  }

 
  ngOnInit(): void {
    this.check_language()
  }
  check_language(){
    const lang =  localStorage.getItem('LOCALE');
    if(lang){
      this.selected_lang = lang;
    }
  }


  back(){
    this.router.navigate(['/application/additional-information']);
  }

 

  fetch_data() {
    const payload = {
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_declaration_url, payload).subscribe((res) => {
      if (res) {
        this.records = res;
        if (res.length != 0) {
          this.applicationForm.patchValue(this.records);
        } 
        console.log(res)
        this.loadingService.hideloading();
      }

    });
  }

  save_data() {
    if (this.applicationForm.valid) {
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed Submitting Application?').then((res) => {
        if (res) {
          const payload = {
            "data": this.applicationForm.value
          } 
          this.loadingService.showloading();
          this.administrationService.postrecord(create_declaration_url, payload).subscribe((res) => {
            if (res) {
              this.toastService.showToastNotification('success', 'Successfully Submitted', '');
              this.router.navigate(['/landing/home']);
              this.loadingService.hideloading();
            }

          });
        }
      });
    } else {
      this.toastService.showToastNotification('error', 'Please check all boxes','');
      this.administrationService.markFormAsDirty(this.applicationForm);
      this.loadingService.hideloading();
    }
  }




}
