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
import { ResumesSearchFormTplComponent } from './component/resumes-search-form-tpl/resumes-search-form-tpl.component';
import { ResumesByPositionComponent } from './resumes-manage/resumes-by-position/resumes-by-position.component';
import { ListItemsComponent } from './resumes-manage/resumes-by-position/list-items/list-items.component';
import { SearchOptionFormCComponent } from './resumes-manage/component/search-option-form-c/search-option-form-c.component';
import { CollectFileFormTplComponent } from './resumes-manage/resumes-history/collect-resume-list-c/collect-file-form-tpl/collect-file-form-tpl.component';
import { ResumesListItemCComponent } from './resumes-manage/component/resumes-list-item-c/resumes-list-item-c.component';
import { ResumesCollectListComponent } from './resumes-manage/resumes-collect-list/resumes-collect-list.component';
import { ResumesDownloadListComponent } from './resumes-manage/resumes-download-list/resumes-download-list.component';


const COMPONENTS = [
  CompanyAdminLayoutComponent,
  CompanyAdminHomeComponent,
  PositionListComponent,
  PositionCreateComponent,
  // 简历搜索
  ResumesListComponent,
  // 简历管理
  ResumesHandleComponent,
  ResumesByPositionComponent, // 通过职位获取简历
  ResumesHistoryComponent, // 简历库
  ResumesCollectListComponent, // 简历库收藏简历列表
  ResumesDownloadListComponent, // 简历库 简历下载列表
  PositionListCComponent,
  OrganizationComponent
];

const ENTRYCOMPONENTS = [
  CompanySidebarComponent,
  CompanyContentTopComponent,
  PositionFormComponent,
  // 简历搜索 表单组件
  ResumesSearchFormTplComponent,
  // 简历管理   简历库子组件
  CollectResumeListCComponent,
  DownloadResumeListCComponent,
  SaveResumeListCComponent,
  SendResumeListCComponent,
  JoinusResumeListCComponent,
  // 简历列表，显示列内容
  ResumesListColsCComponent,
  ListItemsComponent,
  ResumesListItemCComponent, // 将简历列表展示 修改未共享组件
  SearchOptionFormCComponent,
  // 新建收藏夹
  CollectFileFormTplComponent
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
