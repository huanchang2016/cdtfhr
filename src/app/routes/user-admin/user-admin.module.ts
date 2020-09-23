import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { UserAdminRoutingModule } from './user-admin-routing.module';
import { UserAdminLayoutComponent } from './user-admin-layout/user-admin-layout.component';
import { UserAdminHomeComponent } from './user-center/user-admin-home/user-admin-home.component';
import { UserSidebarComponent } from './component/user-sidebar/user-sidebar.component';
import { UserAdminCertificationComponent } from './user-center/user-admin-certification/user-admin-certification.component';
import { UserAdminBindAccountComponent } from './user-center/user-admin-bind-account/user-admin-bind-account.component';
import { UserContentTopComponent } from './component/user-content-top/user-content-top.component';
import { UserRecommendPositionsComponent } from './component/user-recommend-positions/user-recommend-positions.component';
import { ResumeListComponent } from './resume-manage/resume-list/resume-list.component';
import { ResumeCreateComponent } from './resume-manage/resume-create/resume-create.component';

// 表单组件
import { UserAdminInfoFormCComponent } from './component/resumes-forms/user-admin-info-form-c/user-admin-info-form-c.component';
import { UserAdminEducationComponent } from './component/resumes-forms/user-admin-education/user-admin-education.component';
import { UserAdminOtherInfoComponent } from './component/resumes-forms/user-admin-other-info/user-admin-other-info.component';
import { ResumeEditComponent } from './resume-manage/resume-edit/resume-edit.component';
import { ResumeDetailsInfoComponent } from './component/resume-details-info/resume-details-info.component';
import { UserInfoTplComponent } from './component/resume-details-info/user-info-tpl/user-info-tpl.component';
import { UserIntensionTplComponent } from './component/resume-details-info/user-intension-tpl/user-intension-tpl.component';
import { UserInfoFormTplComponent } from './component/resume-details-info/user-info-tpl/user-info-form-tpl/user-info-form-tpl.component';
import { UserIntensionFormTplComponent } from './component/resume-details-info/user-intension-tpl/user-intension-form-tpl/user-intension-form-tpl.component';
import { UserWorkExpTplComponent } from './component/resume-details-info/user-work-exp-tpl/user-work-exp-tpl.component';
import { UserWorkExpFormTplComponent } from './component/resume-details-info/user-work-exp-tpl/user-work-exp-form-tpl/user-work-exp-form-tpl.component';
import { UserInternshipExpTplComponent } from './component/resume-details-info/user-internship-exp-tpl/user-internship-exp-tpl.component';
import { UserInternshipExpFormTplComponent } from './component/resume-details-info/user-internship-exp-tpl/user-internship-exp-form-tpl/user-internship-exp-form-tpl.component';
import { UserEducationExpTplComponent } from './component/resume-details-info/user-education-exp-tpl/user-education-exp-tpl.component';
import { EducationExpFormTplComponent } from './component/resume-details-info/user-education-exp-tpl/education-exp-form-tpl/education-exp-form-tpl.component';
import { UserCommentTplComponent } from './component/resume-details-info/user-comment-tpl/user-comment-tpl.component';
import { UserCommentFormTplComponent } from './component/resume-details-info/user-comment-tpl/user-comment-form-tpl/user-comment-form-tpl.component';
import { UserProjectExpTplComponent } from './component/resume-details-info/user-project-exp-tpl/user-project-exp-tpl.component';
import { UserProjectFormTplComponent } from './component/resume-details-info/user-project-exp-tpl/user-project-form-tpl/user-project-form-tpl.component';
import { UserTrainExpTplComponent } from './component/resume-details-info/user-train-exp-tpl/user-train-exp-tpl.component';
import { UserTrainExpFormTplComponent } from './component/resume-details-info/user-train-exp-tpl/user-train-exp-form-tpl/user-train-exp-form-tpl.component';
import { UserCertificateTplComponent } from './component/resume-details-info/user-certificate-tpl/user-certificate-tpl.component';
import { UserCertificateFormTplComponent } from './component/resume-details-info/user-certificate-tpl/user-certificate-form-tpl/user-certificate-form-tpl.component';
import { UserLanguageTplComponent } from './component/resume-details-info/user-language-tpl/user-language-tpl.component';
import { UserLanguageFormTplComponent } from './component/resume-details-info/user-language-tpl/user-language-form-tpl/user-language-form-tpl.component';
import { UserInterestTplComponent } from './component/resume-details-info/user-interest-tpl/user-interest-tpl.component';
import { UserInterestFormTplComponent } from './component/resume-details-info/user-interest-tpl/user-interest-form-tpl/user-interest-form-tpl.component';
import { ResumeTitleTplComponent } from './component/resume-title-tpl/resume-title-tpl.component';
import { UserAdminHomeGuard } from './guard/user-admin-home.guard';
import { AuthenticationGuard } from './guard/authentication.guard';
import { UserAdminGuard } from './guard/user-admin.guard';
import { ResumeSectionDeletedModalComponent } from './component/resume-section-deleted-modal/resume-section-deleted-modal.component';
import { ResumeLeaveComponentModalComponent } from './component/resume-leave-component-modal/resume-leave-component-modal.component';
import { UserAdminWorkAndintensionFormCComponent } from './component/resumes-forms/user-admin-work-andintension-form-c/user-admin-work-andintension-form-c.component';
import { UserResumesCreateSuccessTplComponent } from './component/resumes-forms/user-resumes-create-success-tpl/user-resumes-create-success-tpl.component';
import { UserBindAccountFormTplComponent } from './user-center/user-admin-bind-account/user-bind-account-form-tpl/user-bind-account-form-tpl.component';


const GUARDS = [
  UserAdminGuard,
  UserAdminHomeGuard,
  AuthenticationGuard
];

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
  UserAdminOtherInfoComponent,
  // 简历编辑
  ResumeEditComponent
];

const ENTRYCOMPONENTS = [
  UserAdminInfoFormCComponent,
  // 教育经历
  UserAdminEducationComponent,
  // 工作与求职
  UserAdminWorkAndintensionFormCComponent,
  // 简历详情信息展示
  ResumeDetailsInfoComponent,
  // 简历名称 模块
  ResumeTitleTplComponent,
  UserInfoTplComponent, // 个人信息
  UserInfoFormTplComponent,
  UserIntensionTplComponent, // 求职意向
  UserIntensionFormTplComponent,
  UserWorkExpTplComponent, // 工作经历
  UserWorkExpFormTplComponent,
  UserEducationExpTplComponent, // 教育经历
  EducationExpFormTplComponent,
  UserCommentTplComponent, // 自我评价
  UserCommentFormTplComponent,
  UserInternshipExpTplComponent, // 实习经历
  UserInternshipExpFormTplComponent,
  UserProjectExpTplComponent,  // 项目经历
  UserProjectFormTplComponent,
  UserTrainExpTplComponent, // 培训经历
  UserTrainExpFormTplComponent,
  UserCertificateTplComponent, // 证书
  UserCertificateFormTplComponent,
  UserLanguageTplComponent, // 其它语言能力
  UserLanguageFormTplComponent,
  UserInterestTplComponent, // 兴趣爱好
  UserInterestFormTplComponent,
  // 删除某段信息弹出层
  ResumeSectionDeletedModalComponent,
  UserResumesCreateSuccessTplComponent,
  ResumeLeaveComponentModalComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...ENTRYCOMPONENTS,
    UserBindAccountFormTplComponent
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
