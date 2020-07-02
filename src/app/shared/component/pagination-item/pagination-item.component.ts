import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-item',
  templateUrl: './pagination-item.component.html',
  styleUrls: ['./pagination-item.component.less']
})
export class PaginationItemComponent implements OnInit {
  
  @Input() total:number;

  @Output() pageIndexEmit:EventEmitter<any> = new EventEmitter();

  currentPage:number = 1;
  

  constructor() { }

  ngOnInit(): void {
  }

  // 翻页
  pageIndexChange(page:number) {
    console.log('page Index change', page, this.currentPage);
    // this.currentPage = page;
    this.pageIndexEmit.emit({page: page});
  }

}
