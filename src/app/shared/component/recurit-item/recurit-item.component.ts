import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recurit-item',
  templateUrl: './recurit-item.component.html',
  styleUrls: ['./recurit-item.component.less']
})
export class RecuritItemComponent implements OnChanges {
  @Input() data:any;

  constructor(
    private router: Router
  ) { }

  ngOnChanges(): void {
  }

}
