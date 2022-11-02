

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { UserList } from '../../../administration/interfaces/administration';
import { AdministrationService } from '../../../administration/services/administration.service';
import { create_eligibility_url, fetch_deadline_url, fetch_eligibility_url } from '../../../app.constants';


@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.css']
})
export class EligibilityComponent implements OnInit {
  applicationForm: FormGroup;
  dtOptions: any = {};
  records = [];
  begin: any = null
  passed_deadline: any = true;
  selected_lang: string = 'en';

  @ViewChild('langModal') public langModal: ModalDirective;

  
  constructor(private router: Router, private loadingService: LoadingService,
    public toastService: ToastService, public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService
   ) {

    this.applicationForm = this.formBuilder.group({
      language: new FormControl('',Validators.compose([Validators.required])),  
      innovation_early_stage: new FormControl('',Validators.compose([Validators.required])),  
      innovation_scaleup_stage: new FormControl('',Validators.compose([Validators.required])),  
      location: new FormControl('',Validators.compose([Validators.required])),  
      operation_type: new FormControl('',Validators.compose([Validators.required])),  
      lead_applicant_location: new FormControl('',Validators.compose([Validators.required])),  
      licensed: new FormControl('',Validators.compose([Validators.required])),       
    });

    this.fetch_eligibility();
    this.check_deadline();
    
   }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.check_language();
  }
  check_deadline(){
    const payload = {

    }
    this.administrationService.getrecords(fetch_deadline_url,payload).subscribe((res) => {
      if(res) {
        this.passed_deadline = res['deadline'];
        console.log(this.passed_deadline)
      }
    })
  }

  check_language(){
    const lang =  localStorage.getItem('LOCALE');
    if(lang){
      this.selected_lang = lang;
    } else {
      this.langModal.show()
    }
  }

  handle_lang(lang){
    console.log(lang);
    localStorage.setItem("LOCALE", lang);
    this.selected_lang = lang;
    this.langModal.hide()
    // localStorage.removeItem(TOKEN_KEY);
  }

  start(){
    this.begin = true;
  }

  fetch_eligibility() {
      const search_payload = {
      };
      this.loadingService.showloading();
      this.administrationService.getrecords(fetch_eligibility_url, search_payload).subscribe((res) => {
        if (res) {
          this.records = res;
          if (res.length == 0) {
            this.begin = false;
          } else {
            this.applicationForm.patchValue(this.records);
            this.begin = true;
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
          this.administrationService.postrecord(create_eligibility_url, payload).subscribe((res) => {
            if (res) {
              this.router.navigate(['/application/details']);
              this.loadingService.hideloading();
            }

          });
      //   }
      // });
    } else {
      this.toastService.showToastNotification('error',
      'Please correct errors','');
      this.administrationService.markFormAsDirty(this.applicationForm);
      this.loadingService.hideloading();
    }
  }










}
