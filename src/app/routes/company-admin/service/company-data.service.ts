import { Injectable } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {


comanyInfo:any;


constructor(
  private settingService: GlobalSettingsService
) {}

getProfile():Promise<any> {
  return new Promise((resolve) => {
    this.settingService.get('/v1/web/com/info').subscribe((res:ApiData) => {
      console.log('Company DataService get Data', res.data);
      this.comanyInfo = res.data;
      resolve(this.comanyInfo);
    })
  })
}
}
