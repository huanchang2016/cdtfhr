import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-apply-online-details',
  templateUrl: './apply-online-details.component.html',
  styleUrls: ['./apply-online-details.component.less']
})
export class ApplyOnlineDetailsComponent implements OnInit {

  dataInfo:any = null;
  loading:boolean = true;

  newsId:number;

  steps:any[] = [];
  menus:any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingService: GlobalSettingsService
  ) {
    this.activatedRoute.params.subscribe((params:Params) => {
      if(params) {
        this.newsId = +params['id'];
        this.getData();
      }
    })
  }

  ngOnInit(): void {
    

  }

  getData():void {

    // 获取招考 左侧 菜单项
    this.settingService.post(`/v1/web/exam/exam_announces/${this.newsId}`).subscribe((res:ApiData) => {
      console.log('menu', res)
      if(res.code === 200) {
        this.menus = res.data;
        if(this.menus.length !== 0) {
          this.status_menu = this.menus[0].id;
          this.getInfo();
        }
      }
    });
    
    // 获取招考流程图数据
    this.settingService.post(`/v1/web/exam/exam_flows/${this.newsId}`).subscribe((res:ApiData) => {
      if(res.code === 200) {
        this.steps = res.data;
      }
    });
  }

  getInfo():void {
    //  获取左侧菜单对应的公告内容
    this.loading = true;
    this.settingService.get(`/v1/web/exam/announce/${this.status_menu}`).subscribe((res:ApiData) => {
      this.loading = false;
      console.log('dataInfo', res)
      if(res.code === 200) {
        this.dataInfo = res.data;
      }else {
        this.dataInfo = null;
      }
    })
  }

  status_menu:number = 0;
  viewStatus(status: number):void {
    this.status_menu = status;
    this.getInfo();
  }
}
