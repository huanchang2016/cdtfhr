import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-item',
  templateUrl: './pagination-item.component.html',
  styleUrls: ['./pagination-item.component.less']
})
export class PaginationItemComponent implements OnInit {

  @Input() total: number;
  @Input() limit: number;
  @Input() currentPage: number;

  @Output() pageIndexEmit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // 翻页
  pageIndexChange(page: number) {
    this.pageIndexEmit.emit({ page: page });
  }

}
