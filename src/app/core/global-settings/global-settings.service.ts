import { Injectable } from '@angular/core';
import { User } from 'src/app/data/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(url:string, option?:any):Observable<any> {
    return this.httpClient.get(url, option);
  }
  
  post(url:string, option?:any):Observable<any> {
    return this.httpClient.post(url, option);
  }

  getBytoken(url:string, option?:any):Observable<any> {
    return this.httpClient.get(url, option);
  }
  postBytoken(url:string, option?:any):Observable<any> {
    return this.httpClient.post(url, option);
  }
  // tslint:disable-next-line: semicolon

  setToken(token: any) {
    localStorage.setItem('cdtfhr_token', JSON.stringify(token));
  }

  getToken():string {
    const token:any = JSON.parse(localStorage.getItem('cdtfhr_user'));
    if(token) {
      return token.access_token;
    }else {
      return null;
    }
  }

  setUser(user: User): void {
    localStorage.setItem('cdtfhr_user', JSON.stringify(user));
  }

  getUser(): User {
    const user = JSON.parse(localStorage.getItem('cdtfhr_user'));
    if(user) {
      return user;
    }
    
  }
  
  clearUser(): void {
    localStorage.removeItem('cdtfhr_user');
    localStorage.removeItem('cdtfhr_token');

  }
}
