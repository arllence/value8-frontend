

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
// import { approve_graduand_url, clear_gowns_picked_url, clear_graduand_url, delete_graduand_url, list_departmental_student_gowns_returned_url, list_departmental_student_gowns_url, list_department_graduands_url, list_department_url, list_graduands_url, list_staff_url, return_gowns_picked_url } from '../../../app.constants';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { UserList } from '../../../administration/interfaces/administration';
import { AdministrationService } from '../../../administration/services/administration.service';
import { create_proposal_url, fetch_proposal_url } from '../../../app.constants';
@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent implements OnInit {
  public searchForm: FormGroup;
  applicationForm: FormGroup;
  dtOptions: any = {};
  records: UserList[] = [];
  department_list = [];
  searchString: string;
  department_id: any;
  graduandRecords: any;
  @ViewChild('clearanceModal') public clearanceModal: ModalDirective;
  max_Length: any;
  selected_lang: string = 'en';
  constructor(private router: Router, private loadingService: LoadingService,
    public toastService: ToastService, public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService ) {
    this.searchForm = this.formBuilder.group({
      search_value: new FormControl('', Validators.compose([Validators.minLength(2), Validators.maxLength(100) ])),
    });
    this.applicationForm = this.formBuilder.group({
      innovation_name: new FormControl('',Validators.compose([Validators.required])),  
      innovation_description: new FormControl('',),  
      innovation_explanation: new FormControl('',Validators.compose([Validators.required])),  
      target_users: new FormControl('',Validators.compose([Validators.required])),  
      target_area: new FormControl('',Validators.compose([Validators.required])),  
      problem_solved: new FormControl('',),  
      targeted_behaviour_change: new FormControl('',),  
      approach: new FormControl('',),       
      impacts: new FormControl('',),       
      impact_indicator: new FormControl('',),       
      replication_capability: new FormControl('',Validators.compose([Validators.required])),       
      testing_and_iteration: new FormControl('',Validators.compose([Validators.required])),       
      target_engagement: new FormControl('',Validators.compose([Validators.required])),       
      negative_impacts: new FormControl('',Validators.compose([Validators.required])),       
      team_skills: new FormControl('',Validators.compose([Validators.required])),       
      skills_gap: new FormControl('',Validators.compose([Validators.required])),       
      partnerships: new FormControl('',Validators.compose([Validators.required])),       
      traction_achieved: new FormControl('',Validators.compose([Validators.required])),       
    });

    this.fetch_proposal();
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
    this.router.navigate(['/application/details']);
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


  fetch_proposal() {
    const payload = {
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_proposal_url, payload).subscribe((res) => {
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
          this.administrationService.postrecord(create_proposal_url, payload).subscribe((res) => {
            if (res) {
              // this.router.navigate(['/application/attachments']);
              this.router.navigate(['/application/additional-information']);
              this.loadingService.hideloading();
            }

          });
        // }
      // });
    } else {
      this.toastService.showToastNotification('error', 'Please correct errors','');
      this.administrationService.markFormAsDirty(this.applicationForm);
      this.loadingService.hideloading();
    }
  }










}
