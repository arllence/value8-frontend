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
import { create_additional_info_url, fetch_additional_info_url, fetch_countries_url } from '../../../app.constants';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.css']
})
export class AdditionalInformationComponent implements OnInit {
  applicationForm: FormGroup;
 
  countries = [];
  is_other: boolean = false;
  is_other_motivation: boolean = false;
  is_other_funding: boolean = false;
  is_other_effect: boolean = false;
  is_other_stage: boolean = false;
  records = [];
  blank = [];
  selected_lang: string = 'en';

 
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {

        this.applicationForm = this.formBuilder.group({
          found_out: new FormControl('',Validators.compose([Validators.required])),  
          motivation: new FormControl('',Validators.compose([Validators.required])),  
          hope_to_learn: new FormControl('',Validators.compose([Validators.required])),  
          none_financial_training: new FormControl('',Validators.compose([Validators.required])),  
          funding_received: new FormControl('',Validators.compose([Validators.required, Validators.maxLength(50) ])),  
          gender_concerns: new FormControl('',Validators.compose([Validators.required])),  
          gender_relevance: new FormControl('',Validators.compose([Validators.required])),       
          direct_effect: new FormControl('',Validators.compose([Validators.required])),       
          capacity_and_resources: new FormControl('',Validators.compose([Validators.required])),       
          involvement_facilitation: new FormControl('',Validators.compose([Validators.required])),       
          indicators: new FormControl('',Validators.compose([Validators.required])),       
          innovation_stage: new FormControl('',Validators.compose([Validators.required])),       
          solution_start_date: new FormControl('',Validators.compose([Validators.required])),            
        });
    
        // this.fetchGowns();  
        // this.checkCanPickGowns();
        this.fetch_data();
  }

  if_other(event){
    if (event == 'Other'){
      this.is_other == true;
    } else {
      this.is_other == false;
    }
  }
  if_other_motivation(event){
    if (event == 'Other'){
      this.is_other_motivation == true;
    } else {
      this.is_other_motivation == false;
    }
  }
  if_other_funding(event){
    if (event == 'Other'){
      this.is_other_funding == true;
    } else {
      this.is_other_funding == false;
    }
  }
  if_other_effect(event){
    if (event == 'Other'){
      this.is_other_effect == true;
    } else {
      this.is_other_effect == false;
    }
  }
  if_other_stage(event){
    if (event == 'Other'){
      this.is_other_stage == true;
    } else {
      this.is_other_stage == false;
    }
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
    this.router.navigate(['/application/proposal']);
  }


  fetch_data() {
    const payload = {
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_additional_info_url, payload).subscribe((res) => {
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
      // this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed creating record?').then((res) => {
      //   if (res) {
          const payload = {
            "data": this.applicationForm.value
          } 
          this.loadingService.showloading();
          this.administrationService.postrecord(create_additional_info_url, payload).subscribe((res) => {
            if (res) {
              this.router.navigate(['/application/declaration']);
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
