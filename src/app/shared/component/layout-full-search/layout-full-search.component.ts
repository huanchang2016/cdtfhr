import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-full-search',
  templateUrl: './layout-full-search.component.html',
  styleUrls: ['./layout-full-search.component.less']
})
export class LayoutFullSearchComponent implements OnInit {
  
  inputValue:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
