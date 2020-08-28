import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-right-sidebar-job-history',
  templateUrl: './right-sidebar-job-history.component.html',
  styleUrls: ['./right-sidebar-job-history.component.less']
})
export class RightSidebarJobHistoryComponent implements OnInit {
  loadingData: boolean = true;

  list: any[] = [];

  constructor(
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {

    /***
     * 历史查看记录
     * 当前页面 需要登录后才可以访问
     * 
     * ****/
    if(this.settingService.user && this.settingService.user.type === 'user' && this.settingService.getToken()) {
      this.loadingData = true;
      this.settingService.get('/v1/web/user/view_jobs').subscribe((res:ApiData) => {
        console.log(res, 'view jobs')
        this.loadingData = false;
        this.list = res.data;
      }, err => this.loadingData = false);
    }
    
  }

}
