import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P403Component } from './views/error/403.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './app.interceptor';

import { NgxSpinnerModule } from 'ngx-spinner';
import { SafePipe } from './safepipe';
export function jwtTokenGetter() {
  return localStorage.getItem('access_token');
}



import { SharedModule } from './common-module/common-module/common-module.module';
const APP_CONTAINERS = [
  DefaultLayoutComponent

];
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';





import { NgxPermissionsModule } from 'ngx-permissions';
import { CommonSidebarComponent } from './containers/common-sidebar/common-sidebar.component';
import { DynamicNestedFormModule } from './dynamic-nested-form/dynamic-nested-form.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form/dynamic-form.module';


// import { TrustComponent} from './trust/app.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicNestedFormModule,
    DynamicFormModule,
    PerfectScrollbarModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://39d27368.ngrok.io']
      }
    }),
  ],
  declarations: [
    AppComponent,
    // SafePipe,
    ...APP_CONTAINERS,
    P404Component,
    P403Component,
    CommonSidebarComponent,
 


  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  // {
  //   provide: LocationStrategy,
  //   useClass: HashLocationStrategy
  // },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
