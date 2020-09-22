import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserDataService } from '../../service/user-data.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import { UserAdminInfoFormCComponent } from '../../component/resumes-forms/user-admin-info-form-c/user-admin-info-form-c.component';
import { ResumeLeaveComponentModalComponent } from '../../component/resume-leave-component-modal/resume-leave-component-modal.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-resume-create',
  templateUrl: './resume-create.component.html',
  styleUrls: ['./resume-create.component.less']
})
export class ResumeCreateComponent implements OnInit {

  submitLoading: boolean = false;

  step: 0 | 1 | 2 | 3 = 0;

  // 先获取信息，根据信息判断当前用户的实名认证 进行到了哪一步？
  resumeUserInfo: any = null;
  resumeId:number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingService: GlobalSettingsService,
    private msg: NzMessageService,
    private modalService: NzModalService,
    private userDataService: UserDataService
  ) {
    this.settingService.setTitle('新增简历-我的简历-个人中心-天府菁英网');
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.resumeId = +params['id'];
    //   console.log('id', 'current create resume', this.resumeId)
    //   if(this.resumeId) {
    //     this.getResumeInfo(this.resumeId);
    //   }
    // })
    // this.getResumeInfo(52);
  }

  getResumeInfo(id:number):void {
    this.settingService.get(`/v1/web/user/resume/${id}`).subscribe((res:ApiData) => {
      console.log('resumeInfo works!', res.data);
      if(res.code === 200) {
        this.resumeUserInfo = res.data;
      }
    }, err => this.resumeUserInfo = null);
  }

  ngOnInit(): void { }

  @ViewChild('userInfoTpl', { static: false }) userInfoTpl: UserAdminInfoFormCComponent;

  submitInfo(is_leave:boolean = false, observer?:any) {
    if(!this.userInfoTpl.submitForm()) {
      return;
    }
    this.userInfoTpl.submitForm().then(object => {

      let userInfo: FormData = new FormData();
      
      for (const key in object) {
        // 参加工作时间  work_date  和 暂未参加工作 is_not_work 有一个 一定会有值
        if (key === 'registered_residence') {
          userInfo.append('registered_province_id', object[key][0]);
          userInfo.append('registered_city_id', object[key][1]);
        } else if (key === 'address_city') {
          userInfo.append('work_province_id', object[key][0]);
          userInfo.append('work_city_id', object[key][1]);
          userInfo.append('work_area_id', object[key][2]);
        } else if (key === 'work_date') {
          const work_date:string = object['is_not_work'] ? '' : object[key];
          userInfo.append('work_date', work_date);
        } else if (key === 'avatar') {
          if(typeof object[key] === 'string') {
            continue
          }else {
            const avatar:string = object['avatar'] ? object[key] : '';
            userInfo.append('avatar', avatar);
          }
        }else if(key === 'is_not_work') {
          continue;
        } else {
          userInfo.append(key, object[key]);
        }
      }

      this.submitLoading = true;

      if(this.resumeUserInfo) {
        userInfo.append('resume_id', this.resumeUserInfo.id);
      }

      this.settingService.post('/v1/web/user/resume/info', userInfo).subscribe((res: ApiData) => {
        console.log(res);
        this.submitLoading = false;
        if (res.code === 200) {
          this.resumeUserInfo = res.data;
          this.userDataService.getProfile().then();
          if(is_leave) {
            this.showLeaveActiveModal(observer);
          }else {
            ++this.step;
          }
          this.msg.success('保存成功');
        } else {
          this.msg.error(res.message);
        }

      }, err => this.submitLoading = false)

    })
  }

  stepsChange(type: string) {
    if (type === 'next') {
      ++this.step;
    } else {
      --this.step;
    }
  }

  isChanged:boolean = false;
  valueChanges(changed:boolean) {
    this.isChanged = changed;
  }

  resumeInfoChange(data:any):void {
    this.resumeUserInfo = data;
  }

  leaveTip():Observable<any> {
    
    return new Observable((observer) => {
      if(this.isChanged){
        let message:string = '';
        if(this.step === 0) { // 在第一步时，需要提示用户 当前数据未提交保存
          message = '当前简历个人信息未保存。';
          this.submitInfo(true, observer);
        }else {
          return this.showLeaveActiveModal(observer);
        }
        
      }else {
        observer.next(true);
      }
    });
  }

  showLeaveActiveModal(observer):void {
    const modal = this.modalService.create({
      nzTitle: '提示',
      // nzContent: '<p class="text-center text-lg text-666">是否离开页面？</p><p class="text-center text-grey">当前简历已存为草稿</p>',
      nzMaskClosable: false,
      nzContent: ResumeLeaveComponentModalComponent,
      nzComponentParams: {
        // message: message
      },
      nzFooter: null
    });
    modal.afterClose.subscribe(result => {
      if(result) {
        observer.next(true);
      }else {
        observer.next(false);
      }
    });
  }
}
