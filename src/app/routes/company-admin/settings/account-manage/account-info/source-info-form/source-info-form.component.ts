import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-source-info-form',
  templateUrl: './source-info-form.component.html',
  styleUrls: ['./source-info-form.component.less']
})
export class SourceInfoFormComponent implements OnInit {
  @Input() data:any;

  list:any[] = [
    { id: 1, name: 'zhangsanfeng', msg: { account: 99, is_not_limit: false }, download: { account: 0, is_not_limit: true }},
    { id: 2, name: 'jiangerwa', msg: { account: 0, is_not_limit: true }, download: { account: 0, is_not_limit: true }},
    { id: 3, name: 'weiweiyanaoke', msg: { account: 33, is_not_limit: false }, download: { account: 0, is_not_limit: true }},
    { id: 4, name: 'zhudashaoye', msg: { account: 22, is_not_limit: false }, download: { account: 66, is_not_limit: false }},
    { id: 5, name: 'meiqimingyue', msg: { account: 0, is_not_limit: true }, download: { account: 0, is_not_limit: true }}
  ];

  constructor() { }

  ngOnInit(): void {
  }


  closeModal() {
    console.log('close Modal');
  }

  submit() {
    console.log('sljfkalsdjfl submit');
  }
}
