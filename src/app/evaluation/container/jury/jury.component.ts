import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
// import { serverurl, list_department_url, list_program_url, list_courses_url, create_name_confirmation_url, fetch_graduand_confirmation_url, list_gowns_url, check_can_pick_gowns_url, create_gown_picked_url, list_picked_gowns_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { create_additional_info_url, create_evaluation_url, create_jury_evaluation_url, fetch_additional_info_url, fetch_countries_url, fetch_evaluation_url, fetch_full_application_url, fetch_jury_evaluation_url } from '../../../app.constants';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.css']
})
export class JuryComponent implements OnInit {
  applicationForm: FormGroup;
 
  countries = [];
  records = [];
  blank = [];
  selected_lang: string = 'en';
  application_id: string = '';
  payload: { creator_id: string; };

 
  
  constructor(
    private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      private route: ActivatedRoute,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {

        this.applicationForm = this.formBuilder.group({
          innovator_id: new FormControl(''),  
          description_of_innovation: new FormControl('',Validators.compose([Validators.required])),   
          description_of_innovation_comment: new FormControl('',Validators.compose([Validators.required])),   
          innovation: new FormControl('',Validators.compose([Validators.required])),   
          innovation_comment: new FormControl('',Validators.compose([Validators.required ])),  
          marketing: new FormControl('',Validators.compose([Validators.required])),  
          marketing_comment: new FormControl('',Validators.compose([Validators.required])),       
          climate_adaptation_impact: new FormControl('',Validators.compose([Validators.required])),       
          climate_adaptation_impact_comment: new FormControl('',Validators.compose([Validators.required])),       
          business_operations: new FormControl('',Validators.compose([Validators.required])),       
          business_operations_comment: new FormControl('',Validators.compose([Validators.required])),       
          team_composition: new FormControl('',Validators.compose([Validators.required])),       
          team_composition_comment: new FormControl('',Validators.compose([Validators.required])),            
          scalability_of_venture: new FormControl('',Validators.compose([Validators.required])),            
          scalability_of_venture_comment: new FormControl('',Validators.compose([Validators.required])),            
          financial_management: new FormControl('',Validators.compose([Validators.required])),            
          financial_management_comment: new FormControl('',Validators.compose([Validators.required])),            
          jury_persona_score: new FormControl('',Validators.compose([Validators.required])),           
          jury_persona_score_comment: new FormControl('',Validators.compose([Validators.required])),           
          enterprise_sector: new FormControl('',Validators.compose([Validators.required])),           
          enterprise_sector_comment: new FormControl('',Validators.compose([Validators.required])),           
          recommended_disbursement_schedule: new FormControl('',Validators.compose([Validators.required])),           
          recommended_disbursement_schedule_comment: new FormControl('',Validators.compose([Validators.required])),           
          general_comment: new FormControl('',Validators.compose([Validators.required])),                  
        });

        let application_id = this.route.snapshot.paramMap.get('application_id');
        if (application_id){
          this.application_id = application_id 
          this.applicationForm.patchValue({"innovator_id": application_id})  
          this.payload = {
            "creator_id":application_id
          }    
        } 
    
        // this.fetchGowns();  
        this.fetch_edit_data();
        this.fetch_data();
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


  fetch_data() {
    // const payload = {
    // };
    console.log(this.payload)
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_full_application_url, this.payload).subscribe((res) => {
      if (res) {
        this.records = res;
        console.log(res)
        this.loadingService.hideloading();
      }

    });
  }

  fetch_edit_data() {
    // const payload = {
    // };
    console.log(this.payload)
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_jury_evaluation_url, this.payload).subscribe((res) => {
      if (res) {
        // this.records = res;
        console.log(res)
        this.applicationForm.patchValue(res)
        this.loadingService.hideloading();
      }

    });
  }

  save_data() {
    if (this.applicationForm.valid) {
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed submitting evaluation? This action is irreversible!').then((res) => {
        if (res) {
          const payload = {
            "data": this.applicationForm.value
          } 
          this.loadingService.showloading();
          this.administrationService.postrecord(create_jury_evaluation_url, payload).subscribe((res) => {
            if (res) {
              this.router.navigate(['/landing/home']);
              this.loadingService.hideloading();
            }

          });
        }
      });
    } else {
      this.toastService.showToastNotification('error', 'Please correct errors','');
      this.administrationService.markFormAsDirty(this.applicationForm);
      this.loadingService.hideloading();
    }
  }




}
