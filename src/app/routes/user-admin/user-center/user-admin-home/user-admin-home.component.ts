import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { environment } from '@env/environment';

@Component({
  selector: 'app-user-admin-home',
  templateUrl: './user-admin-home.component.html',
  styleUrls: ['./user-admin-home.component.less']
})
export class UserAdminHomeComponent implements OnInit {

  environment = environment;
  
  defaultResumeInfo:any;

  constructor(
    private settingService: GlobalSettingsService 
  ) { }

  ngOnInit(): void {
    // 
    this.settingService.get('/v1/web/user/default_resume').subscribe((res:ApiData) => {
      if(res.code === 200) {
        this.defaultResumeInfo = res.data;
      }
    })
  }

}
