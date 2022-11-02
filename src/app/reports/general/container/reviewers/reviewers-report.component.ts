import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ValidatorService } from '../../../services/validator.service';
import { LoadingService } from '../../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../../common-module/shared-service/toast.service';
import { filter_assigned_url } from '../../../../app.constants';
import { Subject } from 'rxjs';
import { DocumentsList } from '../../../interfaces/validator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../../common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-reviewers-report',
  templateUrl: './reviewers-report.component.html',
  styleUrls: ['./reviewers-report.component.css']
})
export class ReviewersReportsComponent implements OnInit {
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
  assigned = [];
  role: any;

  
  constructor(private router: Router, private loadingService: LoadingService, public sweetalertService: SweetalertService,
    public toastService: ToastService, public validatorService: ValidatorService,  private formBuilder: FormBuilder, private route: ActivatedRoute,) { 
      this.searchForm = this.formBuilder.group({
        role: new FormControl('ALL', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
      });

 
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

  search_by(event){
    this.role = event
  }

  innovation_data(assigned){
    this.assigned = [];
    this.assigned = assigned;
  }


  view_records(innovation_id){
    this.router.navigate(['reports/view', innovation_id]);
  }

  application_review(creator_id){
    this.loadingService.showloading();
    this.router.navigate(['application/review', creator_id]);
    this.loadingService.hideloading();
  }

  gsa_toggler(){
    this.gsa_toggler_status = !this.gsa_toggler_status
    this.gsa_toggler_name = this.gsa_toggler_name == 'Close' ? "View" : "Close";
  }

  filterAssigned() {
    if (this.searchForm.valid) {
      const search_payload = {
        'role': this.searchForm.value['role'],
      };
      this.loadingService.showloading();
      this.validatorService.postrecord(filter_assigned_url, search_payload).subscribe((res) => {
        if (res) {
          console.log(res);
          this.records = res;
          this.loadingService.hideloading();
          if(res.length == 0) {
            this.toastService.showToastNotification('info', 'No Evaluator Found', '');
          }
        }

      });

    } else {
      this.toastService.showToastNotification('warning', 'Please correct errors to proceed', '');
      this.validatorService.markFormAsDirty(this.searchForm);
    }
  }


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

