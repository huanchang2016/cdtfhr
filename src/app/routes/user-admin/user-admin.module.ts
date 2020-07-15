import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { UserAdminRoutingModule } from './user-admin-routing.module';
import { UserAdminLayoutComponent } from './user-admin-layout/user-admin-layout.component';
import { UserAdminHomeComponent } from './user-admin-home/user-admin-home.component';
import { UserSidebarComponent } from './component/user-sidebar/user-sidebar.component';
import { UserAdminCertificationComponent } from './user-admin-certification/user-admin-certification.component';
import { UserAdminBindAccountComponent } from './user-admin-bind-account/user-admin-bind-account.component';
import { UserContentTopComponent } from './component/user-content-top/user-content-top.component';
import { UserRecommendPositionsComponent } from './component/user-recommend-positions/user-recommend-positions.component';
import { ResumeListComponent } from './resume-manage/resume-list/resume-list.component';
import { ResumeCreateComponent } from './resume-manage/resume-create/resume-create.component';

// 表单组件
import { UserAdminInfoFormCComponent } from './component/resumes-forms/user-admin-info-form-c/user-admin-info-form-c.component';
import { UserAdminEducationComponent } from './component/resumes-forms/user-admin-education/user-admin-education.component';
import { UserAdminEducationFormCComponent } from './component/resumes-forms/user-admin-education/user-admin-education-form-c/user-admin-education-form-c.component';
import { UserAdminJobIntensionFormCComponent } from './component/resumes-forms/user-admin-job-intension-form-c/user-admin-job-intension-form-c.component';
import { UserAdminWorkExpComponent } from './component/resumes-forms/user-admin-work-exp/user-admin-work-exp.component';
import { UserWorkExpFormCComponent } from './component/resumes-forms/user-admin-work-exp/user-work-exp-form-c/user-work-exp-form-c.component';
import { UserAdminInternshipExpComponent } from './component/resumes-forms/user-admin-internship-exp/user-admin-internship-exp.component';
import { UserInternshipExpFormCComponent } from './component/resumes-forms/user-admin-internship-exp/user-internship-exp-form-c/user-internship-exp-form-c.component';
import { UserAdminOtherInfoComponent } from './component/resumes-forms/user-admin-other-info/user-admin-other-info.component';


const COMPONENTS = [
  UserAdminLayoutComponent, // 布局组件
  UserSidebarComponent, // 导航组件
  UserContentTopComponent, // 内容区顶部公共组件
  UserAdminHomeComponent, // 个人主页
  UserRecommendPositionsComponent, // 个人主页  默认简历展示 卡片
  UserAdminCertificationComponent,
  UserAdminBindAccountComponent,
  // 简历管理
  ResumeListComponent,
  ResumeCreateComponent,
  UserAdminJobIntensionFormCComponent
];

const ENTRYCOMPONENTS = [
  UserAdminInfoFormCComponent,
  // 教育经历
  UserAdminEducationComponent,
  UserAdminEducationFormCComponent,
  // 工作经历
  UserAdminWorkExpComponent,
  UserWorkExpFormCComponent,
  // 实习经历
  UserAdminInternshipExpComponent,
  UserInternshipExpFormCComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...ENTRYCOMPONENTS,
    UserAdminOtherInfoComponent
  ],
  entryComponents: [
    ...ENTRYCOMPONENTS
  ],
  imports: [
    SharedModule,
    UserAdminRoutingModule
  ]
})
export class UserAdminModule { }
