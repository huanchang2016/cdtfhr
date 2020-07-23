import { Component, Input, OnChanges, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    if(this.data || this.data === 0) {
      this.getDataInfo();
    }
  }

  getDataInfo() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      let status:string[] = ['投递成功', 'HR查看', '面试邀请'];

      const status_name = status[Math.floor(Math.random() * 3)];
      this.info = {
        ...this.data,
        status: {
          id: 1,
          name: status_name,
          time: '2020-07-22 14:20:33'
        }
      }

      if(this.info.status.name === '投递成功') {
        this.step = 0;
      }
      if(this.info.status.name === 'HR查看') {
        this.step = 1;
      }
      if(this.info.status.name === '面试邀请') {
        this.step = 2;
      }
    }, 500);
  }

}
