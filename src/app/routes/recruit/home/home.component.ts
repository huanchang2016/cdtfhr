import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class RecruitHomeComponent implements OnInit {
  
  searchOption:any = {
    sortValue: 'default',
    salary: null,
    natural: null
  };
  

  constructor() { }

  ngOnInit(): void {
  }


  sortValueChange() {
    // this.searchOption = {

    // };
    console.log('sortValue change', this.searchOption);
  }

}
