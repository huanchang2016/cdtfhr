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


const COMPONENTS = [
  CompanyAdminLayoutComponent,
  CompanyAdminHomeComponent,
  PositionListComponent,
  PositionCreateComponent,
  ResumesListComponent,
  ResumesHandleComponent,
  ResumesHistoryComponent,
  PositionListCComponent
];

const ENTRYCOMPONENTS = [
  CompanySidebarComponent,
  CompanyContentTopComponent,
  PositionFormComponent
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
