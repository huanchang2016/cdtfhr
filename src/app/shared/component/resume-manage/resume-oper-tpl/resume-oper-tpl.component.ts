import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resume-oper-tpl',
  templateUrl: './resume-oper-tpl.component.html',
  styleUrls: ['./resume-oper-tpl.component.less']
})
export class ResumeOperTplComponent implements OnInit {
  @Input() resumeInfo:any;

  constructor() { }

  ngOnInit(): void {
    console.log('resumeInfo oper component works!', this.resumeInfo);
  }

  viewOperRecord():void {
    console.info('查看当前简历的操作记录');
  }
  viewRemarks():void {
    console.info('查看当前简历的 更多备注记录');
  }
}
