import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-recurit-item',
  templateUrl: './recurit-item.component.html',
  styleUrls: ['./recurit-item.component.less']
})
export class RecuritItemComponent implements OnInit {
  @Input() data:any;
  environment = environment;

  constructor() { }

  ngOnInit(): void {
    console.log(this.data, 'data');
  }

}
