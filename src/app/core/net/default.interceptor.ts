import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponseBase, HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const CODEMESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase) {

    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
      return;
    }

    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
  }

  private handleData(ev: any): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    if (ev.status > 0) {
      
    }
    // this.checkStatus(ev);
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        // if (event instanceof HttpResponse) {
        //     const body: any = event.body;
        //     if (body && body.status !== 0) {
        //         this.msg.error(body.msg);
        //         // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
        //         // this.http.get('/').subscribe() 并不会触发
        //         return throwError({});
        //     } else {
        //         // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
        //         return of(new HttpResponse(Object.assign(event, { body: body.response })));
        //         // 或者依然保持完整的格式
        //         return of(event);
        //     }
        // }
        break;
      case 400:
        this.msg.error(ev.error.message);
        break;
      case 401:
        this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
        localStorage.clear();
        this.goTo('/passport/login');
        break;
      case 403:
      case 404:
      case 500:
        // this.goTo(`/exception/${ev.status}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          // console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', ev);
          const errors = ev.error.errors;
          const errorText:string = errors[Object.keys(errors)[0]];
          this.msg.error(errorText);
        }
        break;
    }
    if (ev instanceof HttpErrorResponse) {
      return throwError(ev);
    } else {
      return of(ev);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.SERVER_URL + url;
    }
    
    let newReq:any = req.clone({ url });
    // 判断是否为配置项请求，如果是配置项请求，请求中则不添加token字段
    const is_take_token:boolean = this.isNotNeedTokenRequest(url);
    //  如果用户已登录，那么所有接口都添加token请求
    if (localStorage.getItem('cdtfhr_token') && is_take_token) {
      const token:string = JSON.parse(localStorage.getItem('cdtfhr_token')).access_token;
      newReq.headers = newReq.headers.set('Authorization', 'Bearer '+ token);
    }
    return next.handle(newReq).pipe(
        retry(3),
        mergeMap((event: any) => {
            // 允许统一对请求错误处理
            if (event instanceof HttpResponseBase) {
              return this.handleData(event);
            }
            // 若一切都正常，则后续操作
            return of(event);
        }),
        catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }

  ignores:string[] = [
    '/v1/web/setting/', // 配置项
    // 个人请求
    '/v1/web/login',
    '/v1/web/send_login_code',
    '/v1/web/send_reg_code',
    '/v1/web/register',
    // 企业
    '/v1/web/com/register',
    '/v1/web/com/login',
    // 职位详情页 推荐职位接口
    '/v1/web/jobs/recommend',
    // 其余为首页相关请求
    '/v1/web/index/'
  ];
  // 判断当前接口是否需要携带token, 如果存在，则返回false， 不存在则返回true
  isNotNeedTokenRequest(url:string):boolean{
    return this.ignores.every(item => url.indexOf(item) === -1);
  }
}
