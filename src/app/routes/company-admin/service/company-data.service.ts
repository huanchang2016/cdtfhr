import { Injectable } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {


  companyInfo: any;

  positionConfig: any;

  constructor(
    private settingService: GlobalSettingsService
  ) { }

  getProfile(): Promise<any> {
    return new Promise((resolve) => {
      this.settingService.get('/v1/web/com/info').subscribe((res: ApiData) => {
        this.companyInfo = res.data;
        resolve(this.companyInfo);
      })
    })
  }
  getPositionConfig(): Promise<any> {
    return new Promise((resolve) => {
      this.settingService.post(`/v1/web/com/resume/config_jobs`).subscribe((res: ApiData) => {
        this.positionConfig = res.data;
        resolve(this.positionConfig)
      })
    })
  }

}
