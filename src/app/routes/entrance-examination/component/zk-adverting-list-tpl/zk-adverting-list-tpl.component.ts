import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zk-adverting-list-tpl',
  templateUrl: './zk-adverting-list-tpl.component.html',
  styleUrls: ['./zk-adverting-list-tpl.component.less']
})
export class ZkAdvertingListTplComponent implements OnInit {

  list:any[] = [1, 2, 3];

  constructor() { }

  ngOnInit(): void {
  }

}
