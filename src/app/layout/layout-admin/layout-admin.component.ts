import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.less']
})
export class LayoutAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.querySelector('body').style.backgroundColor = "#F0F0F0";
  }

}
