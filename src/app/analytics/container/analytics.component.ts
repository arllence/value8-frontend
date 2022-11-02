import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { serverurl,monthly_user_registration_url,general_counts_url, user_by_gender_url,user_by_country_url,get_analytics_results_url, filter_by_language_url, application_by_age_url, application_by_gender_url } from '../../app.constants';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AdministrationService } from '../../administration/services/administration.service';
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
  selector: 'app-analytics-list',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  general_counts = [];
  canvas: any;
  ctx: any;
  country_display_type = 'table';
  all_countries_data = [];
  registered_user_data = [];
  incompleteLangChart = [];
  complete_by_age = [];
  incomplete_by_age = [];
  complete_by_gender = [];
  incomplete_by_gender = [];
  
 
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {    
        this.get_registered_users();  
        // this.get_general_counts();
        this.get_user_by_gender();
        this.get_user_by_country();
        this.get_results();
        this.filter_by_language();
        this.application_by_age();
        this.application_by_gender()

  }

  set_country_display_type(){
    if (this.country_display_type == 'table'){
      this.country_display_type = 'chart';
      this.get_user_by_country();
      this.get_user_by_gender();
      this.get_registered_users();
      this.filter_by_language();
      this.application_by_age();
      this.application_by_gender();
    } else if (this.country_display_type == 'chart'){
      this.country_display_type = 'table';
    }
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public doughtnutOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
  };
  public monthsLabels =  ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  public userRole = ['Role']
  public userCountry = ['Country']
  public userResults = ['Results']
  public userWinners = ['Winners']
  public byCountry = []
  public results = [];
  public winners = [];
  public registeredUsersData = [];
  public generalCountData = [];
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public colors = [{
    fillColor: 'rgba(47, 132, 71, 0.8)',
    strokeColor: 'rgba(47, 132, 71, 0.8)',
    highlightFill: 'rgba(47, 132, 71, 0.8)',
    highlightStroke: 'rgba(47, 132, 71, 0.8)'
}];
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  public doughnutChartLabels = ['Male', 'Female'];
  public doughnutChartData = [];
  public languageChartData = [];
  public doughnutChartType = 'doughnut';
  public languageChartType = 'doughnut';

  

  get_registered_users(){
    const payload = { }
    this.administrationService.getrecords(monthly_user_registration_url,payload).subscribe((res) => {
      if(res) {
        this.registeredUsersData = (res['series'][0]['data']);
        // console.log(this.registeredUsersData)
        this.registered_user_data = [];
        for (let item in this.registeredUsersData){
          this.registered_user_data.push({"month":this.monthsLabels[item],"total":this.registeredUsersData[item]})
        }
        try{
          this.canvas = document.getElementById('usersChart');
          this.ctx = this.canvas.getContext('2d');
          let usersChart = new Chart(this.ctx, {
            type: 'horizontalBar',
            data: {
                labels: this.monthsLabels,
                datasets: [{
                    label: 'Total Number',
                    data: this.registeredUsersData,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                }]
            },
            options: {
              legend: {
                  display: false
              },
                  responsive: true,
                  // display:true
                scales: {
                  xAxes: [{
                      ticks: {
                        suggestedMin: 0,
                        suggestedMax: 200,
                        stepSize: 50
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Users'
                      },
                  }],
                  yAxes: [ {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Months'
                    }
                  } ]
              }
            }
          });
        } catch (e) {}
      }
    })
  }
  get_general_counts(){
    const payload = { }
    this.administrationService.getrecords(general_counts_url,payload).subscribe((res) => {
      if(res) {
        this.generalCountData = res['series'];
        this.general_counts = res;
      }
    })
  }

  application_by_age(){
    const payload = { }
    this.administrationService.getrecords(application_by_age_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.complete_by_age =  res['complete']
        const age_groups = []
        const labelNames = []
        for (let data of res['complete']){
          age_groups.push(data.data[0])
          labelNames.push(data.label)
        }  
        
        try {     
          this.canvas = document.getElementById('completeByAgeChart');
          
          this.ctx = this.canvas.getContext('2d');
          let myChart = new Chart(this.ctx, {
            type: 'horizontalBar',
            data: {
                labels: labelNames,
                datasets: [{
                    label: 'Age Group',
                    data: age_groups,
                    // backgroundColor: ['#20c997','#6610f2','#e83e8c','#f8cb00','#20a8d8'],
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                }]
            },
            options: {
              legend: {
                  display: false
              },
                  responsive: true,
                  // display:true
                  scales: {
                    xAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 4,
                            stepSize: 1
                            
                        }
                    }]
                }
            }
          });
        } catch (error) {
            
        }
        // this.loadingService.hideloading();
        // end first
        this.incomplete_by_age =  res['incomplete']
        const incomplete_by_age = []
        const incompleteLabelNames = []
        for (let data of res['incomplete']){
          incomplete_by_age.push(data.data[0])
          incompleteLabelNames.push(data.label)
        }

        try{
          this.canvas = document.getElementById('incompleteByAgeChart');          
          if(this.canvas.getContext){
            this.ctx = this.canvas.getContext('2d');
            let incompleteByAgeChart = new Chart(this.ctx, {
              type: 'horizontalBar',
              data: {
                  labels: incompleteLabelNames,
                  datasets: [{
                      label: 'Age Group',
                      data: incomplete_by_age,
                      backgroundColor: ['#20c997','#6610f2','#e83e8c','#f8cb00','#20a8d8','#2f353a','#17a2b8','#73818f','#20c997',"aqua"],
                      borderWidth: 1
                  }]
              },
              options: {
                legend: {
                    display: false
                },
                    responsive: true,
                    // display:true
                    scales: {
                      xAxes: [{
                          ticks: {
                              suggestedMin: 0,
                              suggestedMax: 3,
                              stepSize: 1
                          },
                          scaleLabel: {
                            display: true,
                            labelString: 'Total Number'
                          },
                      }],
                      yAxes: [ {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: 'Age Group'
                        }
                      } ]
                  }
              }
            });
          }
        } catch (e) {}

        // begin
        // const detailedReportLabels = [];
        // const detailedReportScores = [];
        // for(let report of res['evaluation_scores']){
        //   detailedReportLabels.push(report.prenueur);
        //   detailedReportScores.push(report.evaluation_score);
        // }
        // this.canvas = document.getElementById('detailedReportChart');
        // this.ctx = this.canvas.getContext('2d');
        // let detailedReportChart = new Chart(this.ctx, {
        //   type: 'horizontalBar',
        //   data: {
        //       labels: detailedReportLabels,
        //       datasets: [{
        //           label: 'Gender',
        //           data: detailedReportScores,
        //           backgroundColor: ['#008340','#f86c6b','#20c997','#6610f2','#e83e8c','#f8cb00','#20a8d8','#2f353a','#17a2b8','#73818f','#20c997',"aqua",'#FF9C70','#008787','#9686FF','#9AFFD2','#FFE79F','#FCCDFF','#5DFF3E','#F3FF35','#FF00BF','#808000','#000080','#800000'],
        //           borderWidth: 1
        //       }]
        //   },
        //   options: {
        //     legend: {
        //       display: false
        //     },
        //       responsive: true,
        //       scales: {
        //         xAxes: [{
        //             ticks: {
        //                 // suggestedMin: 0,
        //                 // suggestedMax: 3,
        //                 // stepSize: 1
        //             },
        //             scaleLabel: {
        //               display: true,
        //               labelString: 'Score'
        //             },
        //         }],
        //         yAxes: [ {
        //           display: true,
        //           scaleLabel: {
        //             display: true,
        //             labelString: 'Entreprenuer'
        //           }
        //         } ]
        //     }
        //   }
        // });
        // end

         // begin
        //  const allCountriesLabels = [];
        //  const allCountriesTotals = [];
        //  for(let report of res['all_countries']){
        //    allCountriesLabels.push(report.country);
        //    allCountriesTotals.push(report.count);
        //  }
        //  this.canvas = document.getElementById('countriesReportChart');
        //  this.ctx = this.canvas.getContext('2d');
        //  let countriesReportChart = new Chart(this.ctx, {
        //    type: 'horizontalBar',
        //    data: {
        //        labels: allCountriesLabels,
        //        datasets: [{
        //            label: 'Enterprises',
        //            data: allCountriesTotals,
        //            backgroundColor: ['#800000','#f86c6b','#808000','#6610f2','#e83e8c','#f8cb00','#2f353a','#17a2b8','#73818f','#20c997',"aqua",'#FF9C70','#008787','#9686FF','#9AFFD2','#FFE79F','#FCCDFF','#5DFF3E','#F3FF35','#FF00BF','#808000','#000080','#800000'],
        //            borderWidth: 1
        //        }]
        //    },
        //    options: {
        //      legend: {
        //        display: false
        //      },
        //        responsive: true,
        //        scales: {
        //         xAxes: [{
        //             ticks: {
        //                 suggestedMin: 0,
        //                 suggestedMax: 7,
        //                 stepSize: 1
        //             },
        //             scaleLabel: {
        //               display: true,
        //               labelString: 'Number of Enterprises Per Country'
        //             },
        //         }],
        //         yAxes: [ {
        //           display: true,
        //           scaleLabel: {
        //             display: true,
        //             labelString: 'Country'
        //           }
        //         } ]
        //     }
        //    }
        //  });
         // end



      }
    })
  }

  application_by_gender(){
    const payload = { }
    this.administrationService.getrecords(application_by_gender_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.complete_by_gender =  res['complete']
        const gender_groups = []
        const labelNames = []
        for (let data of res['complete']){
          gender_groups.push(data.data[0])
          labelNames.push(data.label)
        }  
        
        try {     
          this.canvas = document.getElementById('completeByGender');
          
          this.ctx = this.canvas.getContext('2d');
          let myChart = new Chart(this.ctx, {
            type: 'horizontalBar',
            data: {
                labels: labelNames,
                datasets: [{
                    label: 'gender Group',
                    data: gender_groups,
                    // backgroundColor: ['#20c997','#6610f2','#e83e8c','#f8cb00','#20a8d8'],
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                }]
            },
            options: {
              legend: {
                  display: false
              },
                  responsive: true,
                  // display:true
                  scales: {
                    xAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 4,
                            stepSize: 1
                            
                        }
                    }]
                }
            }
          });
        } catch (error) {
            
        }
        // this.loadingService.hideloading();
        // end first
        this.incomplete_by_gender =  res['incomplete']
        const incomplete_by_gender = []
        const incompleteLabelNames = []
        for (let data of res['incomplete']){
          incomplete_by_gender.push(data.data[0])
          incompleteLabelNames.push(data.label)
        }

        try{
          this.canvas = document.getElementById('incompleteByGender');          
          if(this.canvas.getContext){
            this.ctx = this.canvas.getContext('2d');
            let incompleteBygenderChart = new Chart(this.ctx, {
              type: 'horizontalBar',
              data: {
                  labels: incompleteLabelNames,
                  datasets: [{
                      label: 'Gender',
                      data: incomplete_by_gender,
                      backgroundColor: ['#20c997','#6610f2','#e83e8c','#f8cb00','#20a8d8','#2f353a','#17a2b8','#73818f','#20c997',"aqua"],
                      borderWidth: 1
                  }]
              },
              options: {
                legend: {
                    display: false
                },
                    responsive: true,
                    // display:true
                    scales: {
                      xAxes: [{
                          ticks: {
                              suggestedMin: 0,
                              suggestedMax: 3,
                              stepSize: 1
                          },
                          scaleLabel: {
                            display: true,
                            labelString: 'Total Number'
                          },
                      }],
                      yAxes: [ {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: 'Gender '
                        }
                      } ]
                  }
              }
            });
          }
        } catch (e) {}

        // begin
        // const detailedReportLabels = [];
        // const detailedReportScores = [];
        // for(let report of res['evaluation_scores']){
        //   detailedReportLabels.push(report.prenueur);
        //   detailedReportScores.push(report.evaluation_score);
        // }
        // this.canvas = document.getElementById('detailedReportChart');
        // this.ctx = this.canvas.getContext('2d');
        // let detailedReportChart = new Chart(this.ctx, {
        //   type: 'horizontalBar',
        //   data: {
        //       labels: detailedReportLabels,
        //       datasets: [{
        //           label: 'Gender',
        //           data: detailedReportScores,
        //           backgroundColor: ['#008340','#f86c6b','#20c997','#6610f2','#e83e8c','#f8cb00','#20a8d8','#2f353a','#17a2b8','#73818f','#20c997',"aqua",'#FF9C70','#008787','#9686FF','#9AFFD2','#FFE79F','#FCCDFF','#5DFF3E','#F3FF35','#FF00BF','#808000','#000080','#800000'],
        //           borderWidth: 1
        //       }]
        //   },
        //   options: {
        //     legend: {
        //       display: false
        //     },
        //       responsive: true,
        //       scales: {
        //         xAxes: [{
        //             ticks: {
        //                 // suggestedMin: 0,
        //                 // suggestedMax: 3,
        //                 // stepSize: 1
        //             },
        //             scaleLabel: {
        //               display: true,
        //               labelString: 'Score'
        //             },
        //         }],
        //         yAxes: [ {
        //           display: true,
        //           scaleLabel: {
        //             display: true,
        //             labelString: 'Entreprenuer'
        //           }
        //         } ]
        //     }
        //   }
        // });
        // end

         // begin
        //  const allCountriesLabels = [];
        //  const allCountriesTotals = [];
        //  for(let report of res['all_countries']){
        //    allCountriesLabels.push(report.country);
        //    allCountriesTotals.push(report.count);
        //  }
        //  this.canvas = document.getElementById('countriesReportChart');
        //  this.ctx = this.canvas.getContext('2d');
        //  let countriesReportChart = new Chart(this.ctx, {
        //    type: 'horizontalBar',
        //    data: {
        //        labels: allCountriesLabels,
        //        datasets: [{
        //            label: 'Enterprises',
        //            data: allCountriesTotals,
        //            backgroundColor: ['#800000','#f86c6b','#808000','#6610f2','#e83e8c','#f8cb00','#2f353a','#17a2b8','#73818f','#20c997',"aqua",'#FF9C70','#008787','#9686FF','#9AFFD2','#FFE79F','#FCCDFF','#5DFF3E','#F3FF35','#FF00BF','#808000','#000080','#800000'],
        //            borderWidth: 1
        //        }]
        //    },
        //    options: {
        //      legend: {
        //        display: false
        //      },
        //        responsive: true,
        //        scales: {
        //         xAxes: [{
        //             ticks: {
        //                 suggestedMin: 0,
        //                 suggestedMax: 7,
        //                 stepSize: 1
        //             },
        //             scaleLabel: {
        //               display: true,
        //               labelString: 'Number of Enterprises Per Country'
        //             },
        //         }],
        //         yAxes: [ {
        //           display: true,
        //           scaleLabel: {
        //             display: true,
        //             labelString: 'Country'
        //           }
        //         } ]
        //     }
        //    }
        //  });
         // end



      }
    })
  }


  get_user_by_gender(){
    const payload = { }
    this.administrationService.getrecords(user_by_gender_url,payload).subscribe((res) => {
      if(res) {
        try{
        console.log(res);
          this.doughnutChartData = res['series'];
          // begin
          this.canvas = document.getElementById('genderChart');
          this.ctx = this.canvas.getContext('2d');
          let genderChart = new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female'],
                datasets: [{
                    label: 'Gender',
                    data: this.doughnutChartData,
                    backgroundColor: ['#20a8d8','#f86c6b'],
                    borderWidth: 1
                }]
            },
            options: {
              legend: {
                display: true
              },
                responsive: true,
                // display:true
            }
          });
          // end
          // begin
          this.canvas = document.getElementById('droppedGenderChart');
          this.ctx = this.canvas.getContext('2d');
          const gdata = res['dropped'];
          let droppedGenderChart = new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female'],
                datasets: [{
                    label: 'Gender',
                    data: res['dropped'],
                    backgroundColor: ['#20a8d8','#f86c6b'],
                    borderWidth: 1
                }]
            },
            options: {
              legend: {
                display: true
              },
                responsive: true,
                // display:true
                // plugins: [ChartDataLabels],
              //   plugins: {
              //     datalabels: {
              //       display: true,
              //       align: 'bottom',
              //       backgroundColor: '#ccc',
              //       borderRadius: 3,
              //       font: {
              //         size: 18,
              //       }
              //     },
              // }
            }
          });
          // end
          
        } catch (e) {}
      } 
      })
  }

  filter_by_language(){
    const payload = { }
    this.administrationService.getrecords(filter_by_language_url,payload).subscribe((res) => {
      if(res) {
        try{
        console.log(res);
          this.languageChartData = res['series'];
          this.incompleteLangChart = res['incomplete'];
          // begin
          this.canvas = document.getElementById('languageChart');
          this.ctx = this.canvas.getContext('2d');
          let genderChart = new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                labels: ['English', 'French', 'Portuguese'],
                datasets: [{
                    label: 'Language',
                    data: this.languageChartData,
                    backgroundColor: ['#20a8d8','#f86c6b','#62b090'],
                    borderWidth: 1
                }]
            },
            options: {
              legend: {
                display: true
              },
                responsive: true,
                // display:true
            }
          });
          // end
          // begin
          this.canvas = document.getElementById('incompleteLangChart');
          this.ctx = this.canvas.getContext('2d');
          let droppedGenderChart = new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                labels: ['English', 'French', 'Portuguese'],
                datasets: [{
                    label: 'Language',
                    data: res['incomplete'],
                    backgroundColor: ['#20a8d8','#f86c6b','#62b090'],
                    borderWidth: 1
                }]
            },
            options: {
              legend: {
                display: true
              },
                responsive: true,
                // display:true
                // plugins: [ChartDataLabels],
              //   plugins: {
              //     datalabels: {
              //       display: true,
              //       align: 'bottom',
              //       backgroundColor: '#ccc',
              //       borderRadius: 3,
              //       font: {
              //         size: 18,
              //       }
              //     },
              // }
            }
          });
          // end
          
        } catch (e) {}
      } 
      })
  }
  
  get_user_by_country(){
    const payload = { }
    this.loadingService.showloading()
    this.administrationService.getrecords(user_by_country_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.all_countries_data =  res['series']
        const countries = []
        const countryNames = []
        for (let country of res['series']){
          // console.log(country)
          countries.push(country.data[0])
          countryNames.push(country.label)
        }  
        
        try {     
          this.canvas = document.getElementById('countryChart');
          
          this.ctx = this.canvas.getContext('2d');
          let myChart = new Chart(this.ctx, {
            type: 'horizontalBar',
            data: {
                labels: countryNames,
                datasets: [{
                    label: 'Enterprises',
                    data: countries,
                    // backgroundColor: ['#20c997','#6610f2','#e83e8c','#f8cb00','#20a8d8'],
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                }]
            },
            options: {
              legend: {
                  display: false
              },
                  responsive: true,
                  // display:true
                  scales: {
                    xAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 4,
                            stepSize: 1
                            
                        }
                    }]
                }
            }
          });
        } catch (error) {
            
        }
        this.loadingService.hideloading();
        // end first
        // const droppedCountries = []
        // const droppedCountryNames = []
        // for (let country of res['dropped_countries']){
        //   droppedCountries.push(country.data[0])
        //   droppedCountryNames.push(country.label)
        // }

        // try{
        //   this.canvas = document.getElementById('droppedCountryChart');          
        //   if(this.canvas.getContext){
        //     this.ctx = this.canvas.getContext('2d');
        //     let droppedCountryChart = new Chart(this.ctx, {
        //       type: 'horizontalBar',
        //       data: {
        //           labels: droppedCountryNames,
        //           datasets: [{
        //               label: 'Country',
        //               data: droppedCountries,
        //               backgroundColor: ['#20c997','#6610f2','#e83e8c','#f8cb00','#20a8d8','#2f353a','#17a2b8','#73818f','#20c997',"aqua"],
        //               borderWidth: 1
        //           }]
        //       },
        //       options: {
        //         legend: {
        //             display: false
        //         },
        //             responsive: true,
        //             // display:true
        //             scales: {
        //               xAxes: [{
        //                   ticks: {
        //                       suggestedMin: 0,
        //                       suggestedMax: 3,
        //                       stepSize: 1
        //                   },
        //                   scaleLabel: {
        //                     display: true,
        //                     labelString: 'Total Number'
        //                   },
        //               }],
        //               yAxes: [ {
        //                 display: true,
        //                 scaleLabel: {
        //                   display: true,
        //                   labelString: 'Country'
        //                 }
        //               } ]
        //           }
        //       }
        //     });
        //   }
        // } catch (e) {}

        // begin
        // const detailedReportLabels = [];
        // const detailedReportScores = [];
        // for(let report of res['evaluation_scores']){
        //   detailedReportLabels.push(report.prenueur);
        //   detailedReportScores.push(report.evaluation_score);
        // }
        // this.canvas = document.getElementById('detailedReportChart');
        // this.ctx = this.canvas.getContext('2d');
        // let detailedReportChart = new Chart(this.ctx, {
        //   type: 'horizontalBar',
        //   data: {
        //       labels: detailedReportLabels,
        //       datasets: [{
        //           label: 'Gender',
        //           data: detailedReportScores,
        //           backgroundColor: ['#008340','#f86c6b','#20c997','#6610f2','#e83e8c','#f8cb00','#20a8d8','#2f353a','#17a2b8','#73818f','#20c997',"aqua",'#FF9C70','#008787','#9686FF','#9AFFD2','#FFE79F','#FCCDFF','#5DFF3E','#F3FF35','#FF00BF','#808000','#000080','#800000'],
        //           borderWidth: 1
        //       }]
        //   },
        //   options: {
        //     legend: {
        //       display: false
        //     },
        //       responsive: true,
        //       scales: {
        //         xAxes: [{
        //             ticks: {
        //                 // suggestedMin: 0,
        //                 // suggestedMax: 3,
        //                 // stepSize: 1
        //             },
        //             scaleLabel: {
        //               display: true,
        //               labelString: 'Score'
        //             },
        //         }],
        //         yAxes: [ {
        //           display: true,
        //           scaleLabel: {
        //             display: true,
        //             labelString: 'Entreprenuer'
        //           }
        //         } ]
        //     }
        //   }
        // });
        // end

         // begin
        //  const allCountriesLabels = [];
        //  const allCountriesTotals = [];
        //  for(let report of res['all_countries']){
        //    allCountriesLabels.push(report.country);
        //    allCountriesTotals.push(report.count);
        //  }
        //  this.canvas = document.getElementById('countriesReportChart');
        //  this.ctx = this.canvas.getContext('2d');
        //  let countriesReportChart = new Chart(this.ctx, {
        //    type: 'horizontalBar',
        //    data: {
        //        labels: allCountriesLabels,
        //        datasets: [{
        //            label: 'Enterprises',
        //            data: allCountriesTotals,
        //            backgroundColor: ['#800000','#f86c6b','#808000','#6610f2','#e83e8c','#f8cb00','#2f353a','#17a2b8','#73818f','#20c997',"aqua",'#FF9C70','#008787','#9686FF','#9AFFD2','#FFE79F','#FCCDFF','#5DFF3E','#F3FF35','#FF00BF','#808000','#000080','#800000'],
        //            borderWidth: 1
        //        }]
        //    },
        //    options: {
        //      legend: {
        //        display: false
        //      },
        //        responsive: true,
        //        scales: {
        //         xAxes: [{
        //             ticks: {
        //                 suggestedMin: 0,
        //                 suggestedMax: 7,
        //                 stepSize: 1
        //             },
        //             scaleLabel: {
        //               display: true,
        //               labelString: 'Number of Enterprises Per Country'
        //             },
        //         }],
        //         yAxes: [ {
        //           display: true,
        //           scaleLabel: {
        //             display: true,
        //             labelString: 'Country'
        //           }
        //         } ]
        //     }
        //    }
        //  });
         // end



      }
    })
  }

  get_results(){
    // const payload = { }
    // this.administrationService.getrecords(get_analytics_results_url,payload).subscribe((res) => {
    //   if(res) {

    //     const labels = [];
    //     const results = [];
    //     for (let data of res['winners']){
    //       results.push(data.data[0])
    //       labels.push(data.label)
    //     }
    //     try{
    //       this.canvas = document.getElementById('winnersChart');
    //       this.ctx = this.canvas.getContext('2d');
    //       let winnersChart = new Chart(this.ctx, {
    //         type: 'horizontalBar',
    //         data: {
    //             labels: labels,
    //             datasets: [{
    //                 label: 'Total Score',
    //                 data: results,
    //                 backgroundColor: ['#20c997','#6610f2','#e83e8c','#f8cb00','#20a8d8','#2f353a','#17a2b8','#73818f','#20c997',"aqua"],
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //           legend: {
    //               display: false
    //           },
    //               responsive: true,
    //               // display:true
    //             scales: {
    //               xAxes: [{
    //                   ticks: {
    //                       suggestedMin: 300,
    //                       suggestedMax: 600
    //                   },
    //                   scaleLabel: {
    //                     display: true,
    //                     labelString: 'Total Score'
    //                   },
    //               }],
    //               yAxes: [ {
    //                 display: true,
    //                 scaleLabel: {
    //                   display: true,
    //                   labelString: 'Enterprise'
    //                 }
    //               } ]
    //           }
    //         }
    //       });
    //     } catch (e) {}
    //   }
    // })
  }

 


  ngOnInit(): void {
    // this.canvas = document.getElementById('myChart');
    // this.ctx = this.canvas.getContext('2d');
    // let myChart = new Chart(this.ctx, {
    //   type: 'bar',
    //   data: {
    //       labels: ["USA", "Spain", "Italy", "France", "Germany", "UK", "Turkey", "Iran", "China", "Russia", "Brazil", "Belgium", "Canada", "Netherlands", "Switzerland", "India", "Portugal", "Peru", "Ireland", "Sweden"],
    //       datasets: [{
    //           label: 'Total cases.',
    //           data: [886789, 213024, 189973, 158183, 153129, 138078, 101790, 87026, 82804, 62773, 50036, 42797, 42110, 35729, 28496, 23502, 22353, 20914, 17607, 16755],
    //           backgroundColor: ["red", , , , , , , , "orange"],
    //           borderWidth: 1
    //       }]
    //   },
    //   options: {
    // legend: {
    //     display: false
    // },
    //     responsive: false,
    //     // display:true
    //   }
    // });

  // this.canvas = document.getElementById('genderChart');
  //   this.ctx = this.canvas.getContext('2d');
  //   let genderChart = new Chart(this.ctx, {
  //     type: 'doughnut',
  //     data: {
  //         labels: ["Male", "Female"],
  //         datasets: [{
  //             label: 'Gender',
  //             data: this.doughnutChartData,
  //             backgroundColor: ["red", , , , , , , , "orange"],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //   legend: {
  //       display: false
  //   },
  //       responsive: false,
  //       // display:true
  //     }
  //   });
  }

}
