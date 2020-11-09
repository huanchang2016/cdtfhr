import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  exam_id:number;

  steps:any[] = [];
  menus:any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private settingService: GlobalSettingsService
  ) {
    this.activatedRoute.params.subscribe((params:Params) => {
      if(params['id']) {
        this.exam_id = +params['id'];
        this.getData();
      }
    })
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params)
      if(params['id']) {
        this.status_menu = +params['id'];
        this.getInfo();
      }
    })
    
  }

  ngOnInit(): void {
    
  }

  getData():void {
    // 获取招考 左侧 菜单项
    this.settingService.post(`/v1/web/exam/exam_announces/${this.exam_id}`).subscribe((res:ApiData) => {
      console.log('menu', res)
      if(res.code === 200) {
        this.menus = res.data;
        if(this.menus.length === 0) {
          this.loading = false
        }else {
          
          // 如果当前无选中的公告，则默认取第一个
          if(!this.status_menu) {
            this.viewStatus(this.menus[0].id);
          }
        }
      }
    });
    
    // 获取招考流程图数据
    this.settingService.post(`/v1/web/exam/exam_flows/${this.exam_id}`).subscribe((res:ApiData) => {
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
    this.router.navigateByUrl(`/entrance/apply/details/${this.exam_id}?id=${status}`)
    this.getInfo();
  }
}
