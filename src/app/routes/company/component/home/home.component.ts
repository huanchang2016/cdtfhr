import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class CompanyHomeComponent implements OnInit {
  @Input() description:string;

  constructor() { }

  ngOnInit(): void {
  }

}
