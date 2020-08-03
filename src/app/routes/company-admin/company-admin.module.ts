import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { CompanyAdminRoutingModule } from './company-admin-routing.module';
import { CompanyAdminLayoutComponent } from './company-admin-layout/company-admin-layout.component';
import { CompanySidebarComponent } from './component/company-sidebar/company-sidebar.component';
import { CompanyContentTopComponent } from './component/company-content-top/company-content-top.component';
import { CompanyAdminHomeComponent } from './company-center/company-admin-home/company-admin-home.component';
import { PositionListComponent } from './positions-manage/position-list/position-list.component';
import { PositionCreateComponent } from './positions-manage/position-create/position-create.component';
import { ResumesListComponent } from './resumes-manage/resumes-list/resumes-list.component';
import { ResumesHandleComponent } from './resumes-manage/resumes-handle/resumes-handle.component';
import { ResumesHistoryComponent } from './resumes-manage/resumes-history/resumes-history.component';
import { PositionListCComponent } from './positions-manage/position-list/position-list-c/position-list-c.component';
import { PositionFormComponent } from './positions-manage/position-list/position-form/position-form.component';
import { OrganizationComponent } from './settings/organization/organization.component';
import { CollectResumeListCComponent } from './resumes-manage/resumes-history/collect-resume-list-c/collect-resume-list-c.component';
import { DownloadResumeListCComponent } from './resumes-manage/resumes-history/download-resume-list-c/download-resume-list-c.component';
import { SaveResumeListCComponent } from './resumes-manage/resumes-history/save-resume-list-c/save-resume-list-c.component';
import { SendResumeListCComponent } from './resumes-manage/resumes-history/send-resume-list-c/send-resume-list-c.component';
import { JoinusResumeListCComponent } from './resumes-manage/resumes-history/joinus-resume-list-c/joinus-resume-list-c.component';
import { ResumesListColsCComponent } from './component/resumes-list-cols-c/resumes-list-cols-c.component';


const COMPONENTS = [
  CompanyAdminLayoutComponent,
  CompanyAdminHomeComponent,
  PositionListComponent,
  PositionCreateComponent,
  ResumesListComponent,
  ResumesHandleComponent,
  ResumesHistoryComponent,
  PositionListCComponent,
  OrganizationComponent
];

const ENTRYCOMPONENTS = [
  CompanySidebarComponent,
  CompanyContentTopComponent,
  PositionFormComponent,
  // 简历管理   简历库子组件
  CollectResumeListCComponent,
  DownloadResumeListCComponent,
  SaveResumeListCComponent,
  SendResumeListCComponent,
  JoinusResumeListCComponent,
  // 简历列表，显示列内容
  ResumesListColsCComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...ENTRYCOMPONENTS,
  ],
  entryComponents: [
    ...ENTRYCOMPONENTS
  ],
  imports: [
    SharedModule,
    CompanyAdminRoutingModule
  ]
})
export class CompanyAdminModule { }
