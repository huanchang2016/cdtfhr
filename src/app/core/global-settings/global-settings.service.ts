import { Injectable } from '@angular/core';
import { AccountInfo, ApiData, Config } from 'src/app/data/interface';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingsService {

  user:AccountInfo = null;

  globalConfigOptions:{ [key:string]: any[]} = {
    province: [], // 省
    city: [], // 省
    positionType: [], // 职位类别，第一层级
    positionTypeAll: [], // 职位类别，所有的。
    industry: [] // 行业配置项
  };

  
  resumeConfigOptions:{[key:string]: Config[]} = {
    marriage: [], // 婚姻状况
    target_type: [], // 工作性质 全职/兼职
    status: [],  // 求职状态
    salary: [], // 期望月薪 k/月
    language: [], // 语言
    education: []  // 学历
    // {
    //   "key": "marriage",
    //   "value": "未婚",
    //   "sort": 1
    // }
  };
  companyConfigOptions:{[key:string]: Config[]} = {
    company_type: [], // 公司性质： 国企/ 外资
    company_scale: [], // 公司规模 少于 50
    company_work_experience: []  // 职位发布    工作经验要求
    // {
    //   "key": "marriage",
    //   "value": "未婚",
    //   "sort": 1
    // }
  };

  constructor(
    private httpClient: HttpClient
  ) {
    // this.getGlobalConfigs();
    this.getConfigs();
  }

  get province():Array<any> {
    return this.globalConfigOptions.province;
  }
  get cities():Array<any> {
    return this.globalConfigOptions.city;
  }
  get positionType():Array<any> {
    return this.globalConfigOptions.positionType;
  }
  get positionTypeAll():Array<any> {
    return this.globalConfigOptions.positionTypeAll;
  }
  get industry():Array<any> {
    return this.globalConfigOptions.industry;
  }

  get(url:string, option?:any):Observable<any> {
    let _url:string = url;
    if(option) {
      let keys:string = '';
      for (const item in option) {
        const element = option[item];
        if (element || element === 0) {
          keys += `${item}=${element}&`;
        }
      }
      
      _url = _url + '?' + keys;
      _url = _url.substr(0, _url.length - 1);
    }
    return this.httpClient.get(_url);
  }
  
  post(url:string, option?:any):Observable<any> {
    return this.httpClient.post(url, option);
  }

  patch(url:string, option?:any):Observable<any> {
    return this.httpClient.patch(url, option);
  }

  delete(url:string, option?:any):Observable<any> {
    return this.httpClient.delete(url, option);
  }

  getBytoken(url:string, option?:any):Observable<any> {
    return this.httpClient.get(url, option);
  }
  postBytoken(url:string, option?:any):Observable<any> {
    return this.httpClient.post(url, option);
  }
  // tslint:disable-next-line: semicolon

  setToken(token: any) {
    this.setItem('cdtfhr_token', token);
  }

  getToken():string {
    const token:any = JSON.parse(localStorage.getItem('cdtfhr_token'));
    if(token) {
      return token.access_token;
    }else {
      return null;
    }
  }

  setItem(key:string, value:any):void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  getItem(key:string):any {
    return JSON.parse(localStorage.getItem(key));
  }
  
  clearUser(): void {
    localStorage.removeItem('cdtfhr_user');
    localStorage.removeItem('cdtfhr_token');
    // localStorage.clear();

  }
  
  getConfigs():void {
    zip(
      this.get(`/v1/web/setting/city`),
      this.get(`/v1/web/setting/city/all`),
      this.get(`/v1/web/setting/type`),
      this.get(`/v1/web/setting/type/all`),
      this.get(`/v1/web/setting/industry`),
      this.get('/v1/web/setting/resume'),
      this.get('/v1/web/setting/company')
    ).pipe(
      map(([province, city, positionType, type, industry, resume, companyConfig]) => [province.data, city.data, positionType.data, type.data, industry.data, resume.data, companyConfig.data])
    ).subscribe(([province, city, positionType, type, industry, resume, companyConfig]) => {
      this.globalConfigOptions.province = province;
      this.globalConfigOptions.city = city;
      this.globalConfigOptions.positionType = positionType; // 第一层职位类别
      this.globalConfigOptions.positionTypeAll = type; // 所有职位类别
      this.globalConfigOptions.industry = industry;

      this.resumeConfigOptions = resume;
      this.companyConfigOptions = companyConfig;
    })
  }

  // 获取一些常用的全局配置项
  getGlobalConfigs():void {
    this.httpClient.get(`/v1/web/setting/city`).subscribe( (res:ApiData) => {
      console.log(res, 'province ');
      if(res.code === 200) {
        this.globalConfigOptions.city = res.data.map( v => {
          return {
            // value: v.id,
            // label: v.name
            ...v
          }
        });
      }
    })
  }

  getCities(pid:number): Observable<any> {
    return this.get(`/v1/web/setting/city?pid=${pid}`);
  }

  getPositionType(pid:number): Observable<any> {
    return this.get(`/v1/web/setting/type?pid=${pid}`);
  }
}
