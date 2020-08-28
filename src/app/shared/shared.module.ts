import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { UserLoginComponent } from './component/login/user-login/user-login.component';
import { CompanyLoginComponent } from './component/login/company-login/company-login.component';
import { SubTitleShowComponent } from './component/sub-title-show/sub-title-show.component';
import { DatePickerMonthComponent } from './component/forms/date-picker-month/date-picker-month.component';
import { DatePickerDateComponent } from './component/forms/date-picker-date/date-picker-date.component';
import { ThreeStageCascaderComponent } from './component/forms/three-stage-cascader/three-stage-cascader.component';
import { LayoutFullSearchComponent } from './component/layout-full-search/layout-full-search.component';
import { RecuritItemComponent } from './component/recurit-item/recurit-item.component';
import { PaginationItemComponent } from './component/pagination-item/pagination-item.component';
import { ShowTextAreaPipe } from './pipe/show-text-area.pipe';
import { ShowWeekendsPipe } from './pipe/show-weekends.pipe';
import { PostDeliverySuccessComponent } from './component/position-apply/post-delivery-success/post-delivery-success.component';
import { CelebrityNotPassComponent } from './component/position-apply/celebrity-not-pass/celebrity-not-pass.component';
import { UploadLogoComponent } from './component/forms/upload-logo/upload-logo.component';
import { MultipleCascaderSelectedComponent } from './component/forms/multiple-cascader-selected/multiple-cascader-selected.component';
import { RangeDatePickerComponent } from './component/forms/range-date-picker/range-date-picker.component';
import { RangeMonthPickerComponent } from './component/forms/range-month-picker/range-month-picker.component';
import { PositionAddressMapComponent } from './component/position-address-map/position-address-map.component';
import { UploadFilePhotoComponent } from './component/forms/upload-file-photo/upload-file-photo.component';
import { TestInputAccessComponent } from './component/forms/test-input-access/test-input-access.component';
// 简历预览 公共部分
import { ResumeViewSharedTplComponent } from './component/resume-manage/resume-view-shared-tpl/resume-view-shared-tpl.component';
// 简历操作管理
import { ResumeOperTplComponent } from './component/resume-manage/resume-oper-tpl/resume-oper-tpl.component';
import { OperRemarkModalComponent } from './component/resume-manage/resume-oper-tpl/oper-remark-modal/oper-remark-modal.component';
import { OperCollectModalComponent } from './component/resume-manage/resume-oper-tpl/oper-collect-modal/oper-collect-modal.component';
import { OperSaveModalComponent } from './component/resume-manage/resume-oper-tpl/oper-save-modal/oper-save-modal.component';
import { OperSendModalComponent } from './component/resume-manage/resume-oper-tpl/oper-send-modal/oper-send-modal.component';
import { OperDownloadModalComponent } from './component/resume-manage/resume-oper-tpl/oper-download-modal/oper-download-modal.component';
import { ResumeStatusHandleProcessTplComponent } from './component/resume-manage/resume-status-handle-process-tpl/resume-status-handle-process-tpl.component';
import { InterviewMessageSendTplComponent } from './component/resume-manage/interview-message-send-tpl/interview-message-send-tpl.component';
import { InterviewMessageViewTplComponent } from './component/resume-manage/interview-message-view-tpl/interview-message-view-tpl.component';
import { OperRecordListTplComponent } from './component/resume-manage/resume-oper-tpl/oper-record-list-tpl/oper-record-list-tpl.component';
import { OperRemarkListTplComponent } from './component/resume-manage/resume-oper-tpl/oper-remark-list-tpl/oper-remark-list-tpl.component';
import { OperDeliverListTplComponent } from './component/resume-manage/resume-oper-tpl/oper-deliver-list-tpl/oper-deliver-list-tpl.component';
import { ThreePositionTypeCascaderComponent } from './component/forms/three-position-type-cascader/three-position-type-cascader.component';
import { ResumesListShowCComponent } from './component/position-apply/resumes-list-show-c/resumes-list-show-c.component';

// #region third libs

const THIRDMODULES = [];

// #endregion

// #region your componets & directives

const COMPONENTS = [
  UserLoginComponent,
  CompanyLoginComponent,
  SubTitleShowComponent,
  // 复用表单组件
  DatePickerMonthComponent,
  DatePickerDateComponent,
  ThreeStageCascaderComponent,
  ThreePositionTypeCascaderComponent,
  UploadFilePhotoComponent,
  LayoutFullSearchComponent,
  RecuritItemComponent,
  PaginationItemComponent,
  UploadLogoComponent,
  MultipleCascaderSelectedComponent,
  RangeDatePickerComponent,
  RangeMonthPickerComponent,
  PositionAddressMapComponent,
  TestInputAccessComponent,
  ResumeViewSharedTplComponent,
  ResumeOperTplComponent,
  ResumeStatusHandleProcessTplComponent
];

const ENTRYCOMPONENTS = [
  // 简历投递，成功/实名认证/选择简历
  PostDeliverySuccessComponent,
  CelebrityNotPassComponent,
  ResumesListShowCComponent,
  // 简历操作管理 弹出层
  OperRemarkModalComponent,
  OperCollectModalComponent,
  OperSaveModalComponent,
  OperSendModalComponent,
  OperDownloadModalComponent,
  // 面试通知信息填写
  InterviewMessageSendTplComponent,
  // 面试通知消息预览
  InterviewMessageViewTplComponent,
  // 简历记录列表弹窗显示
  OperRecordListTplComponent,
  OperRemarkListTplComponent,
  OperDeliverListTplComponent
];

const DIRECTIVES = [
  ShowTextAreaPipe,
  ShowWeekendsPipe
];

// #endregion

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...ENTRYCOMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  entryComponents: [
    ...ENTRYCOMPONENTS
  ]
})
export class SharedModule { }
