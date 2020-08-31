import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-delivery-status-tpl',
  templateUrl: './delivery-status-tpl.component.html',
  styleUrls: ['./delivery-status-tpl.component.less']
})
export class DeliveryStatusTplComponent implements OnInit {
  @Input() data:any;

  info:any = null;

  step: 0 | 1 | 2 = 0;

  loading: boolean = true;

  constructor(
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit() {
    if(this.data || this.data === 0) {
      console.log(this.data);
      if(this.data.status === 1) {
        this.step = 0;
      }else if(this.data.status === 2) {
        this.step = 1;
      }else {
        this.step = 2;
        this.getDataInfo();
      }
    }
  }

  getDataInfo() {
    this.loading = true;
    this.settingService.get(`/v1/web/user/interview_info/${this.data.companyJob.id}`).subscribe((res:ApiData) => {
      console.log(res, '面试邀请信息');
      this.loading = false;
      if(res.code === 200) {
        this.info = res.data;
      }
    }, err => this.loading = false);
    // setTimeout(() => {
    //   this.loading = false;
    //   let status:string[] = ['投递成功', 'HR查看', '面试邀请'];

    //   const status_name = status[Math.floor(Math.random() * 3)];
    //   this.info = {
    //     ...this.data,
    //     status: {
    //       id: 1,
    //       name: status_name,
    //       time: '2020-07-22 14:20:33'
    //     }
    //   }
    // }, 500);
  }

}
