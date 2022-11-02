import { Component, OnInit, ViewChild } from '@angular/core';
import {
  create_winner_url, my_innovations_url, general_counts_url,check_completed_profile, fetch_deadline_url, fetch_general_analytics_url, fetch_innovations_url
} from '../../app.constants';
import { AdministrationService } from '../../administration/services/administration.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { Router } from '@angular/router';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  all_notices:any;
  my_innovations = null;
  general_counts: any;
  passed_deadline: any = true;
  general_analytics: any =[];
  selected_lang = 'en';
  records = [];
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  searchString: string;

  constructor(public administrationService: AdministrationService,
    public loadingService:LoadingService,
    public sweetalertService: SweetalertService,
    public router: Router,) { 
      this.check_deadline();
    }

  ngOnInit() {
    this.check_completed_profile();
    this.get_my_innovations();
    this.fetch_general_analytics();
    this.check_language();
    this.filterinnovations()
  }


  check_language(){
    const lang =  localStorage.getItem('LOCALE');
    if(lang){
      this.selected_lang = lang;
    }
  }

  filterinnovations() {
      const search_payload = {
        'status': 'RECOMMENDED',
        'stage': 'ALL',
        'language': 'ALL',
        'age': 'ALL',
        'country': 'ALL',
      };
      this.loadingService.showloading();
      this.administrationService.getrecords(fetch_innovations_url, search_payload).subscribe((res) => {
        if (res) {
          console.log(res);
          this.records = res;
          this.loadingService.hideloading();
        }
      });

    } 
    
    application_review(creator_id){
      this.router.navigate(['application/review', creator_id]);
    }


  check_completed_profile(){
    const payload = {

    }
    this.administrationService.getrecords(check_completed_profile,payload).subscribe((res) => {
      if(res) {
        // console.log(res)
        const status = res['status'];
        if (status !== true) {
          this.sweetalertService.showAlert('Additional Info Required!', 'Update Your Profile Before Proceeding', 'warning');
          this.router.navigate(['/profile']);
        } 
      }
    })
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
  get_my_innovations(){
    const payload = {

    }
    // this.loadingService.showloading();
    this.administrationService.getrecords(my_innovations_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.my_innovations = res;
      }
      // this.loadingService.hideloading();
    })
  }

  get_general_counts(){
    const payload = {

    }
    this.administrationService.getrecords(general_counts_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.general_counts = res;
      }
    })
  }

  fetch_general_analytics() {
    // this.loadingService.showloading();
    const payload = {

    };
     this.administrationService.getrecords(fetch_general_analytics_url, payload).subscribe((res) => {
      console.log(res)
      this.general_analytics = res;
      //  this.loadingService.hideloading();

     }, (err) => {
      console.log(err)
     });
  }



  review(){
    this.router.navigate(['application/review', '']);
  }
  qastart(id){
    this.administrationService.set_innovation_id(id);
    this.router.navigate(['/quality-assuarance']);
  }
  testart(id){
    this.administrationService.set_innovation_id(id);
    this.router.navigate(['/technical-evaluation']);
  }
  mastart(id){
    this.administrationService.set_innovation_id(id);
    this.router.navigate(['/manager']);
  }
  
  make_applcation(){
    this.router.navigate(['/application/eligibility']);
  }
  
  check_my_innovations(){
    this.router.navigate(['/innovation/dashboard']);
  }
  // winner(email){
  //   let payload = {
  //     "email" : email
  //   };
  //   this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed Submitting?').then((res) => {
  //     this.loadingService.showloading();
  //     this.administrationService.postrecord(create_winner_url,payload).subscribe((res)=>{
  //       if(res){
  //         this.sweetalertService.showAlert('Success', ' Added Successfully', 'success');
  //       }
  //       this.loadingService.hideloading();
  //     });
  //   });
  // }

}
