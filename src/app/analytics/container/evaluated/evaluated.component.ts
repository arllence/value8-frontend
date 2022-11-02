import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { serverurl,by_gender_url, by_country_url, by_language_url, by_age_url, by_status_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import * as Chart from 'chart.js';
// import {Chart} from 'chart.js';
// Chart.register(ChartDataLabels);
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-labels';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-evaluated-list',
  templateUrl: './evaluated.component.html',
  styleUrls: ['./evaluated.component.css']
})
export class EvaluatedAnalyticsComponent implements OnInit {
  by_language = []
  by_gender = []
  by_age = []
  all_countries_data = []
  country_display_type = 'table'
  by_status: any;


 
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {    
        this.get_user_by_gender();
        this.get_user_by_country();
        this.filter_by_language();
        this.application_by_age();
        this.application_by_gender()
        this.filter_by_status();

  }

  

  application_by_age(){
    const payload = { }
    // this.loadingService.showloading()
    this.administrationService.getrecords(by_age_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.by_age =  res['evaluated'];  
        // this.loadingService.hideloading();     
      }
    })
  }

  application_by_gender(){
    const payload = { }
    this.administrationService.getrecords(by_gender_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.by_gender =  res['evaluated']
      }
    })
  }


  get_user_by_gender(){
    const payload = { }
    this.administrationService.getrecords(by_gender_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.by_gender = res['evaluated'];
      } 
      })
  }

  filter_by_language(){
    const payload = { }
    this.administrationService.getrecords(by_language_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.by_language = res['evaluated'];
      } 
      })
  }

  filter_by_status(){
    const payload = { }
    this.loadingService.showloading()
    this.administrationService.getrecords(by_status_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.by_status = res['evaluated'];
        this.loadingService.hideloading();
      } 
      })
  }
  
  get_user_by_country(){
    const payload = { }
    // this.loadingService.showloading()
    this.administrationService.getrecords(by_country_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.all_countries_data =  res['evaluated']

        }
        // this.loadingService.hideloading();
    })
  }


  ngOnInit(): void {
    
  }

}
