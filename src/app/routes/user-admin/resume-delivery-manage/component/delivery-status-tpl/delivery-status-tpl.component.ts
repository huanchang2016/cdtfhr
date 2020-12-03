import { Component, Input, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
declare var BMap: any;

@Component({
  selector: 'app-delivery-status-tpl',
  templateUrl: './delivery-status-tpl.component.html',
  styleUrls: ['./delivery-status-tpl.component.less']
})
export class DeliveryStatusTplComponent implements OnInit {
  @Input() data: any;

  info: any = null;

  step: 0 | 1 | 2 = 0;

  loading: boolean = true;

  constructor(
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit() {
    if (this.data || this.data === 0) {
      if (this.data.status === 1) {
        this.step = 0;
      } else if (this.data.status === 2) {
        this.step = 1;
      } else {
        this.step = 2;
        this.getDataInfo();
      }
    }
  }

  getDataInfo() {
    this.loading = true;
    this.settingService.get(`/v1/web/user/interview_info/${this.data.companyJob.id}`).subscribe((res: ApiData) => {
      this.loading = false;
      if (res.code === 200) {
        this.info = res.data;
      }
    }, err => this.loading = false);
  }

  posLat: any = null;

  searchAddress(): void {
    let url = `http://api.map.baidu.com/geocoder?address=${this.info.site}&output=html`;
    window.open(url, '_blank');
  }

  addressPositionChange(pos: any): void {
    this.posLat = pos;

  }

}
