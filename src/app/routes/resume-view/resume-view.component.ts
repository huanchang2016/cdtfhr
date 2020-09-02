import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.less']
})
export class ResumeViewComponent implements OnInit {


  list:any[] = [1, 2];

  resume_id:number;

  resumeInfo:any = null;
  loadingData:boolean = true;

  // type: 'company' | 'user' = 'user';
  params:any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    public settingService: GlobalSettingsService
  ) {
    // 获取 当前页面访问来源，单位处理简历时，从职位下访问过来还是其他路径，
    //  如果是从职位访问当前页面，需要展示当前简历在该职位下的投递处理进度及状态

    this.activatedRoute.queryParams.subscribe(params => {
      console.log('status params', this.params);
      if(params['origin']) {
        this.params['origin'] = params['origin'];
      }
      if(params['posId']) {
        this.params['posId'] = +params['posId'];
        // 获取当前 posId 对应的职位信息及简历的状态进度
        this.getResumeStatus();
      }
    });
    
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

  // 获取简历在职位下的处理状态
  getResumeStatus():void {
    console.log('获取简历在职位下的处理进度及状态');
  }

}
