import { Injectable } from '@angular/core';
import { AccountInfo, ApiData } from 'src/app/data/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingsService {

  user:AccountInfo = null;

  province:any[] = [];

  constructor(
    private httpClient: HttpClient
  ) {
    // this.getGlobalConfigs();
  }

  get(url:string, option?:any):Observable<any> {
    return this.httpClient.get(url, option);
  }
  
  post(url:string, option?:any):Observable<any> {
    return this.httpClient.post(url, option);
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

  // setUser(user: AccountInfo): void {
  //   this.setItem('cdtfhr_user', user);
  // }

  // getUser(): AccountInfo {
  //   const user = this.getItem('cdtfhr_user');
  //   if(user) {
  //     return user;
  //   }
    
  // }

  setItem(key:string, value:any):void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  getItem(key:string):any {
    return JSON.parse(localStorage.getItem(key));
  }
  
  clearUser(): void {
    // localStorage.removeItem('cdtfhr_user');
    // localStorage.removeItem('cdtfhr_token');
    localStorage.clear();

  }

  // 获取一些常用的全局配置项
  getGlobalConfigs():void {
    this.httpClient.get(`/v1/web/setting/city`).subscribe( (res:ApiData) => {
      console.log(res, 'province ');
      if(res.code === 200) {
        this.province = res.data.map( v => {
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
    return this.httpClient.get(`/v1/web/setting/city?pid=${pid}`);
  }
}
