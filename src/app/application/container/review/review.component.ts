

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
// import { approve_graduand_url, clear_gowns_picked_url, clear_graduand_url, delete_graduand_url, list_departmental_student_gowns_returned_url, list_departmental_student_gowns_url, list_department_graduands_url, list_department_url, list_graduands_url, list_staff_url, return_gowns_picked_url } from '../../../app.constants';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { UserList } from '../../../administration/interfaces/administration';
import { AdministrationService } from '../../../administration/services/administration.service';
import { change_application_status_url, create_proposal_url, fetch_full_application_url, fetch_proposal_url, serverurl } from '../../../app.constants';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ApplicationReviewComponent implements OnInit {
  applicationForm: FormGroup;
  dtOptions: any = {};
  records = [];
  serverurl = serverurl
  payload:any = {}
  @ViewChild('clearanceModal') public clearanceModal: ModalDirective;
  max_Length: any;
  applicant_id: any;
  selected_lang: string = 'en';

  
  constructor(private router: Router, private loadingService: LoadingService,
    public toastService: ToastService, public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService, private route: ActivatedRoute, ) {

    
    let creator_id = this.route.snapshot.paramMap.get('creator_id');
    if (creator_id){
      this.applicant_id = creator_id
      this.payload = {
        "creator_id":creator_id
      }       
    } 
    this.fetch_data();
  }

  ngOnInit(): void {
    this.check_language();
  }

  check_language(){
    const lang =  localStorage.getItem('LOCALE');
    if(lang){
      this.selected_lang = lang;
    }
  }


  start_evaluating(){
    this.router.navigate(['/evaluation/evaluate', this.applicant_id]);
  }
  jury_evaluating(){
    this.router.navigate(['/evaluation/jury', this.applicant_id]);
  }
  back(){
    this.router.navigate(['/reports/applications']);
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

  drop(status,reason) {
    const payload = {
      "creator_id": this.applicant_id,
      "status": status,
      "reason": reason
    };
    let xstatus = ''
    if (status == 'DROPPED'){
      xstatus = 'dropping'
    } else if (status == 'RECOMMENDED'){
      xstatus = 'recommending'
    }
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed '+ xstatus + ' record? This process is irreversible').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(change_application_status_url, payload).subscribe((res) => {
            if (res) {
              this.toastService.showToastNotification('success', 'Successfully Executed', '');
              this.router.navigate(['/reports/applications']);
              this.loadingService.hideloading();
            }
          });
       }
    });

  }











}
