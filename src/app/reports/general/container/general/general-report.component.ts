import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ValidatorService } from '../../../services/validator.service';
import { LoadingService } from '../../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../../common-module/shared-service/toast.service';
import { fetch_countries_url, fetch_general_analytics_url, fetch_innovations_url, } from '../../../../app.constants';
import { Subject } from 'rxjs';
import { DocumentsList } from '../../../interfaces/validator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../../common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.css']
})
export class GeneralReportsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  public dtTrigger = new Subject<any>();
  records: DocumentsList[] = [];
  searchString: string;
  public searchForm: FormGroup;
  im_analytics: any;
  gsa_toggler_status = true;
  gsa_toggler_name = 'Close';
  hide_filter_form: boolean = false;
  pending_report: boolean = false;
  analytics_summary: any;
  general_analytics: any = [];
  countries = [];
  is_dropped: boolean = false;

  
  constructor(private router: Router, private loadingService: LoadingService, public sweetalertService: SweetalertService,
    public toastService: ToastService, public validatorService: ValidatorService,  private formBuilder: FormBuilder, private route: ActivatedRoute,) { 
      this.searchForm = this.formBuilder.group({
        status: new FormControl('ALL', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
        stage: new FormControl('ALL', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
        language: new FormControl('ALL', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
        age: new FormControl('ALL', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
        country: new FormControl('ALL', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
      });

      this.fetch_general_analytics();
      // this.check_filter();
      this.fetch_countries();
    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      retrieve: true,
    };
    // this.fetchRecords();
    // let action = this.route.snapshot.paramMap.get('slug');
    // if (action){
    //   this.hide_filter_form = true;
    //   if (action === 'pending-final-report'){
    //     this.pending_report = true;
    //     this.fetchPfr();
    //     this.gsa_toggler();
    //   }
    // } else {
    //   this.hide_filter_form = false;
    //   this.fetchImAnalytics();
    //   this.filterinnovations()
    // }    
    
  }
  check_filter(){
    const filter =  localStorage.getItem('RFILTER');
    if(filter){
      this.loadingService.showloading();
      this.validatorService.getrecords(fetch_innovations_url, JSON.parse(filter)).subscribe((res) => {
        if (res) {
          console.log(res)
          this.records = res;
          this.loadingService.hideloading();
        }

      });
    }
  }

  status_change(event){
    if (event == 'DROPPED'){
      this.is_dropped = true;
    } else {
      this.is_dropped = false;
    }

  }

  view_records(innovation_id){
    this.router.navigate(['reports/view', innovation_id]);
  }

  application_review(creator_id){
    this.router.navigate(['application/review', creator_id]);
  }

  gsa_toggler(){
    this.gsa_toggler_status = !this.gsa_toggler_status
    this.gsa_toggler_name = this.gsa_toggler_name == 'Close' ? "View" : "Close";
  }

  filterinnovations() {
    if (this.searchForm.valid) {
      const search_payload = {
        'status': this.searchForm.value['status'],
        'stage': this.searchForm.value['stage'],
        'language': this.searchForm.value['language'],
        'age': this.searchForm.value['age'],
        'country': this.searchForm.value['country'],
      };
      localStorage.setItem("RFILTER", JSON.stringify(search_payload));
      this.loadingService.showloading();
      this.validatorService.getrecords(fetch_innovations_url, search_payload).subscribe((res) => {
        if (res) {
          console.log(res);
          this.records = res;
          this.loadingService.hideloading();
          if(res.length == 0) {
            this.toastService.showToastNotification('info', 'No Application Found', '');
          }
        }

      });

    } else {
      this.toastService.showToastNotification('warning', 'Please correct errors to proceed', '');
      this.validatorService.markFormAsDirty(this.searchForm);
    }
  }

  fetch_countries() {
    const payload = {
    };
    this.loadingService.showloading();
    this.validatorService.getrecords(fetch_countries_url, payload).subscribe((res) => {
      if (res) {
        this.countries = res;
        this.loadingService.hideloading();
      }

    });
  }

  fetch_general_analytics() {
    // this.loadingService.showloading();
    const payload = {

    };
     this.validatorService.getrecords(fetch_general_analytics_url, payload).subscribe((res) => {
       console.log(res);
       this.general_analytics = res;
       this.loadingService.hideloading();

      //  this.dtTrigger.next();

     }, (err) => {
      console.log(err)
      //  this.loadingService.hideloading();

     });
  }


  // fetchImAnalytics() {
  //   // this.loadingService.showloading();
  //   const payload = {

  //   };
  //    this.validatorService.getrecords(im_analytics_url, payload).subscribe((res) => {
  //     //  console.log(res);
  //      this.im_analytics = res;
  //      this.loadingService.hideloading();

  //     //  this.dtTrigger.next();

  //    }, (err) => {
  //     //  this.loadingService.hideloading();

  //    });
  // }



  // fetch_analytics_Summary() {
  //   this.loadingService.showloading();
  //   const payload = {

  //   };
  //    this.validatorService.getrecords(fetch_applications_summary_url, payload).subscribe((res) => {
  //      console.log(res);
  //      this.analytics_summary = res;
  //      this.loadingService.hideloading();

  //      this.dtTrigger.next();

  //    }, (err) => {
  //      this.loadingService.hideloading();

  //    });
  //  }

   rerenderTable(): void {
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       // Destroy the table first
       dtInstance.destroy();
     });
   }
  //  capture_metadata(file_id){
  //    this.router.navigate(['surveyofkenya/document-preview',file_id]);

  //  }


}

