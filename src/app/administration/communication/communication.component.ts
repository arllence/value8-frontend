

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { UserList } from '../../administration/interfaces/administration';
import { AdministrationService } from '../../administration/services/administration.service';
import { create_proposal_url, fetch_proposal_url, get_analytics_url, send_email_url } from '../../app.constants';
@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {
  public searchForm: FormGroup;
  emailForm: FormGroup;
  dtOptions: any = {};
  records: UserList[] = [];
  department_list = [];
  searchString: string;
  department_id: any;
  graduandRecords: any;
  @ViewChild('clearanceModal') public clearanceModal: ModalDirective;
  max_Length: any;
  selected_lang: string = 'en';
  target = []
  is_single: boolean = false;
  analytics: any = null;
  constructor(private router: Router, private loadingService: LoadingService,
    public toastService: ToastService, public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    public sweetalertService: SweetalertService ) {

    this.emailForm = this.formBuilder.group({
      group: new FormControl('',Validators.compose([Validators.required])),  
      target: new FormControl('',Validators.compose([Validators.required])),  
      email: new FormControl(''),  
      message: new FormControl('',Validators.compose([Validators.required])),       
      subject: new FormControl('',Validators.compose([Validators.required])),         
    });

  }

  ngOnInit(): void {
    this.fetch_analytics() 
  }

  select_group(event){
    console.log(event)
    if (event == 'SPECIFIC') {
      this.target = [
        {"name":"Specific User(s)","value":"SINGLE"}
      ]
      this.is_single = true;
    } else if (event == 'APPLICATION') {
        this.target = [
          {"name":"Complete","value":"SUBMITTED"},
          {"name":"Incomplete","value":"ONGOING"}
        ]
        this.is_single = false;
    } else if (event == 'ADMIN') {
        this.target = [
          {"name":"Managers","value":"MANAGER"},
          {"name":"Screeners","value":"SCREENER"},
          {"name":"Evaluators","value":"EVALUATOR"},
          {"name":"Jury","value":"JURY"},
        ]
        this.is_single = false;
    } else if (event == 'USER') {
      this.target = [
        {"name":"Incomplete Profile","value":"INCOMPLETE_PROFILE"},
        {"name":"All Innovators","value":"INNOVATORS"}
      ]
      this.is_single = false;
  }
  }


  CheckLen(event,max,control){
    // c counts the number of words of input value
    const counter = event.target.value.split(' ').length;
    // checks if its above maximum
    if(counter > max){ 
      const form_control = this.emailForm.get(control)
      form_control.setErrors({'max_length': true})
    }
  }


  fetch_analytics() {
    const payload = {
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(get_analytics_url, payload).subscribe((res) => {
      if (res) {
        this.analytics = res;
        console.log(res)
        this.loadingService.hideloading();
      }

    });
  }

  send() {
    if (this.emailForm.valid) {
      this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed sending emails?').then((res) => {
        if (res) {
          const payload = {
            "data": this.emailForm.value
          } 
          this.loadingService.showloading();
          this.administrationService.postrecord(send_email_url, payload).subscribe((res) => {
            // if (res) {
              
            // }
            this.sweetalertService.showAlert('Success','Emails Sent Successfully','success');
              this.emailForm.reset();
              this.loadingService.hideloading();
              this.fetch_analytics() 

          });
          
        }
      });
    } else {
      this.toastService.showToastNotification('error', 'Please correct errors','');
      this.administrationService.markFormAsDirty(this.emailForm);
      this.loadingService.hideloading();
    }
  }










}
