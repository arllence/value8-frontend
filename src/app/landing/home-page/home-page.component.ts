import { Component, OnInit, ViewChild } from '@angular/core';
import {
  buy_product_url,
  create_dispatch_url,
  list_products_url
} from '../../app.constants';
import { AdministrationService } from '../../administration/services/administration.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { Router } from '@angular/router';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  public searchForm: FormGroup;
  reorder_records = [];
  quantity = 0
  to_dispatch = null
  is_status = 'REORDERED';

  constructor(public administrationService: AdministrationService,
    public loadingService:LoadingService,
    public sweetalertService: SweetalertService,
    public router: Router,
    private formBuilder: FormBuilder,) { 
      this.searchForm = this.formBuilder.group({
        status: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
      });
    }

  ngOnInit() {
    this.fetch_products();
    this.fetch_reorder(); 
  }

  search_by(status){
    console.log(status)
    this.records = [];
    this.reorder_records = [];
    this.is_status = status
  }

  set_to_dispatch(ins){
    this.to_dispatch = ins;
  }


  fetch_products() {
    const status = this.searchForm.get('status').value
      const search_payload = {
        "status": this.searchForm.get('status').value
      };
      this.loadingService.showloading();
      this.administrationService.getrecords(list_products_url, search_payload).subscribe((res) => {
        if (res) {
          console.log(res);
          this.records = res;
          if (status == 'REORDERED' || status == 'DISPATCHED'){
            this.reorder_records = res;
          }
          this.loadingService.hideloading();
        }
      });

    } 

  fetch_reorder() {
    const search_payload = {
      "status": 'REORDERED'
    };
    this.loadingService.showloading();
    this.administrationService.getrecords(list_products_url, search_payload).subscribe((res) => {
      if (res) {
        console.log(res);
        this.reorder_records = res;
        this.loadingService.hideloading();
      }
    });

  } 
  
  buy(product_id){
    const payload = {
      "request_id":product_id,
    }
    this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed buying this product?').then((res) => {
      if (res) {
        this.loadingService.showloading();
        this.administrationService.postrecord(buy_product_url, payload).subscribe((res) => {
          if (res) {
            this.fetch_products()
            this.loadingService.hideloading();
          }

        });
      }
    });
  }

  dispatch(product_id){
    const payload = {
      "product_id":product_id,
      "quantity": this.quantity
    }
    this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed?').then((res) => {
      if (res) {
        this.loadingService.showloading();
        this.administrationService.postrecord(create_dispatch_url, payload).subscribe((res) => {
          if (res) {
            this.fetch_reorder()
            this.loadingService.hideloading();
          }

        });
      }
    });
  }




  // review(){
  //   this.router.navigate(['application/review', '']);
  // }


}
