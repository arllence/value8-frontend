import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-footer',
  templateUrl: './common-footer.component.html',
  styleUrls: ['./common-footer.component.css']
})
export class CommonFooterComponent implements OnInit {

  
  date: Date = new Date();  
  year =  this.date.getFullYear();
  selected_lang ='en';
  // console.log(year)

  constructor() { }

  ngOnInit(): void {
    this.check_language();
  }

  check_language(){
    const lang =  localStorage.getItem('LOCALE');
    if(lang){
      this.selected_lang = lang;
    }
  }

}
