import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-sub-title-show',
  templateUrl: './sub-title-show.component.html',
  styleUrls: ['./sub-title-show.component.less']
})
export class SubTitleShowComponent implements OnChanges {
  @Input() title:string;
  @Input() url?:string;
  @Input() isBold?:boolean = true;

  constructor() { }

  ngOnChanges(): void {
  }

}
