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
  loadingData:boolean = false;

  // type: 'company' | 'user' = 'user';
  params:any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public settingService: GlobalSettingsService
  ) {

    this.activatedRoute.params.subscribe((params:Params) => {
      this.resume_id = +params['id'];
      if(this.resume_id) {
        this.getParams();
      }
    })
  }

  configs:any = {
    collect: 0, // 是否收藏
    log: '', // 操作记录
    note: '', // 备注
    status: null, // 当前简历 在 职位下的状态
    invite: false // 如果简历状态是 3， 则需判断 是否已经邀请面试
  }; // 备注信息

  ngOnInit(): void {

  }

  getParams():void {
    // 获取 当前页面访问来源，单位处理简历时，从职位下访问过来还是其他路径，
    //  如果是从职位访问当前页面，需要展示当前简历在该职位下的投递处理进度及状态
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('status params', params);
      let url: string = '';
      if(this.settingService.user.type === 'company') {
        // 存在 queryParams 参数，从企业后台访问过来的 反之则未用户自身预览简历
        url = `/v1/web/com/resume_detail/${this.resume_id}`;
        this.params = params;
        this.getLogConfigs();
      }else {
        url = `/v1/web/user/resume/${this.resume_id}`;
      }
      this.getResumeInfo(url);
    });

  }
  
  getLogConfigs():void {
    let opt:any = { resume_id: this.resume_id };
    if(this.params.posId) {
      opt['job_id'] = this.params.posId;
    }
    this.settingService.post('/v1/web/com/resume/get_resume_config', opt).subscribe((res:ApiData) => {
      console.log('get_resume_config works!', res.data);
      this.configs ={...res.data};
    });
  }

  getResumeInfo(url:string):void {
    this.loadingData = true;
    this.settingService.get(url).subscribe((res:ApiData) => {
      console.log('resumeInfo works!', res.data);
      this.loadingData = false;
      this.resumeInfo = res.data;
      this.settingService.setTitle(`${this.resumeInfo.title}-${this.resumeInfo.name}-简历预览-天府菁英网`);
    }, err => this.loadingData = false);
  }

}
