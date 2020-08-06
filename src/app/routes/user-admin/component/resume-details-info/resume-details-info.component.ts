import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { differenceInMonths } from 'date-fns';

@Component({
  selector: 'app-resume-details-info',
  templateUrl: './resume-details-info.component.html',
  styleUrls: ['./resume-details-info.component.less']
})
export class ResumeDetailsInfoComponent implements OnInit {


  list:any[] = [1, 2];

  resume_id:number;

  resumeInfo:any = null;
  loadingData:boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingService: GlobalSettingsService
  ) {
    this.activatedRoute.params.subscribe((params:Params) => {
      this.resume_id = +params['id'];
      if(this.resume_id) {
        this.getInfo();
      }
    })
  }

  ngOnInit(): void {}

  getInfo():void {
    this.loadingData = true;
    this.settingService.get(`/v1/web/user/resume/${this.resume_id}`).subscribe((res:ApiData) => {
      console.log('resumeInfo works!', res.data);
      this.loadingData = false;
      this.resumeInfo = res.data;
    }, err => this.loadingData = false);
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
