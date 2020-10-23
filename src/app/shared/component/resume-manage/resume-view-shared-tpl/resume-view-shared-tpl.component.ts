import { Component, OnInit, Input } from '@angular/core';
import { environment } from '@env/environment';
import { differenceInYears, differenceInMonths } from 'date-fns';

@Component({
  selector: 'app-resume-view-shared-tpl',
  templateUrl: './resume-view-shared-tpl.component.html',
  styleUrls: ['./resume-view-shared-tpl.component.less']
})
export class ResumeViewSharedTplComponent implements OnInit {
  @Input() resumeInfo:any;

  environment = environment;
  
  constructor() { }

  ngOnInit(): void {
  }

  countYears(t:string):string {
    let work_date:string = '';
    if(t) {
      const today:Date = new Date();
      const year = differenceInYears(today, new Date(t));
      work_date = year > 1 ? `${year}年工作经验` : '工作经验不足一年';
    }else {
      work_date = '暂无工作经验'
    }
    return work_date;
  }

  countMonth(left_time:string, right_time:string):string {
    // 计算两个日期之间相差多少年月，结果如： 2年1个月
    const left:Date = new Date(left_time);
    let end_time:Date;
    if(right_time === '至今') {
      end_time = new Date();
    }else {
      end_time = new Date(right_time);
    }
    const months:number = differenceInMonths(end_time, left);
    let str:string = '';
    const year = Math.floor(months / 12);
    const _mon = months % 12;

    str = (year > 0 ? `${year}年` : '') + (_mon > 0 ? `${_mon}个月` : '');

    return str;
  }
}
