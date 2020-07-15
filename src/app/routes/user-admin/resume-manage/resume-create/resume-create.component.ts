import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAdminInfoFormCComponent } from '../../component/resumes-forms/user-admin-info-form-c/user-admin-info-form-c.component';

@Component({
  selector: 'app-resume-create',
  templateUrl: './resume-create.component.html',
  styleUrls: ['./resume-create.component.less']
})
export class ResumeCreateComponent implements OnInit {

  submitLoading:boolean = false;

  step: 0 | 1 | 2 | 3 | 4 | 5 = 5;

  // 先获取信息，根据信息判断当前用户的实名认证 进行到了哪一步？
  ceritificationInfo:any = null;

  constructor() {}

  ngOnInit(): void {}

  @ViewChild('userInfoTpl', { static: false }) userInfoTpl: UserAdminInfoFormCComponent;

  submitInfo() {
    
    // setTimeout(() => {
    //   this.submitLoading = false;
    //   ++this.step;
    // }, 800);

    this.userInfoTpl.submitForm().then( form => {
      console.log('res,...', form);
      if(form.valid) {
        this.submitLoading = true;
        
        setTimeout(() => {
          this.submitLoading = false;
          // 在当前组件层级 存入 resume_id 简历id。
          ++this.step;
        }, 800);
      }
    })
  }

  stepsChange(type:string) {
    if(type === 'next') {
      ++this.step;
    }else {
      --this.step;
    }
  }
}
