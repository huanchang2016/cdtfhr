import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  paginationIds:any = null;

  resumeInfo:any = null;
  loadingData:boolean = false;

  // type: 'company' | 'user' = 'user';
  params:any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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

  ngOnInit(): void {}

  viewResumeInfo(direction: string): void {
    let id: number;
    if (direction === 'prev') {
      id = this.pagination.prev;
    } else {
      id = this.pagination.next;
    }
    if (!id) {
      console.log('there is no data in next or prev!')
      return;
    }
    this.router.navigate([`/fullscreen/resume/view/${id}`], { queryParams: this.params });
  }
  
  searchOption:any = null;
  getParams():void {
    // 获取 当前页面访问来源，单位处理简历时，从职位下访问过来还是其他路径，
    //  如果是从职位访问当前页面，需要展示当前简历在该职位下的投递处理进度及状态
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('status params', params);
      let url: string = '';
      if(this.settingService.user.type === 'company') {
        // 存在 queryParams 参数，从企业后台访问过来的 反之则未用户自身预览简历
        url = `/v1/web/com/resume_detail`;
        this.params = params
        if(this.params.params && this.isJSON(this.params.params)) {
          this.searchOption = JSON.parse(this.params.params);
        }
        
        this.getLogConfigs();
        this.getCompanyViewResumeInfo(url);
      }else {
        url = `/v1/web/user/resume/${this.resume_id}`;
        this.getResumeInfo(url);
      }
    });

  }

  isJSON(str: any) { // 判断搜索条件是否为字符串
    if (typeof str == 'string') {
      try {
        const obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  }

  downLoadSuccessChange():void {
    // 下载成功后，重新获取简历详情数据
    let url = `/v1/web/com/resume_detail/${this.resume_id}`;
    this.getCompanyViewResumeInfo(url);
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
    this.settingService.post(url).subscribe((res:ApiData) => {
      this.loadingData = false;
      if(res.code === 200 && res.data) {
        this.resumeInfo = res.data;
        this.settingService.setTitle(`${this.resumeInfo.title}-${this.resumeInfo.name}-简历预览-天府菁英网`);
      }else {
        this.resumeInfo = null;
        this.settingService.setTitle(`简历预览-天府菁英网`);
      }
      
    }, err => this.loadingData = false);
  }

  pagination:any = {
    prev: null,
    next: null
  }
  getCompanyViewResumeInfo(url:string):void {
    this.loadingData = true;
    this.settingService.post(url, { resume_id: this.resume_id, ...this.searchOption }).subscribe((res:ApiData) => {
      this.loadingData = false;
      if(res.code === 200 && res.data) {
        this.resumeInfo = res.data;
        this.pagination = res.meta.ids;
        this.settingService.setTitle(`${this.resumeInfo.title}-${this.resumeInfo.name}-简历预览-天府菁英网`);
        if(res.meta.ids) {
          this.paginationIds = res.meta.ids;
        }
      }else {
        this.resumeInfo = null;
        this.settingService.setTitle(`简历预览-天府菁英网`);
      }
      
    }, err => this.loadingData = false);
  }

}
