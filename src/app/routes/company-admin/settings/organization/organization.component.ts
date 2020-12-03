import { Component, OnInit, TemplateRef } from '@angular/core';
import { environment } from '@env/environment';
import { CompanyDataService } from '../../service/company-data.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.less']
})
export class OrganizationComponent implements OnInit {
  environment = environment;

  companyInfo: any = null;

  logoSubmitLoading: boolean = false;
  descriptionSubmitLoading: boolean = false;

  logoTplModal?: NzModalRef;
  descriptionTplModal?: NzModalRef;

  validateLogoForm!: FormGroup;
  validateDescForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService,
    private companyDataService: CompanyDataService
  ) {
    this.settingService.setTitle('企业信息认证-天府菁英网');
  }

  ngOnInit(): void {
    this.validateLogoForm = this.fb.group({
      logo: [null, Validators.required]
    });
    this.validateDescForm = this.fb.group({
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(2000)]]
    });

    if (this.companyDataService.companyInfo) {
      this.companyInfo = this.companyDataService.companyInfo;
    } else {
      this.companyDataService.getProfile().then(v => this.companyInfo = v);
    }
  }

  editLogo(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    if (!this.companyInfo.is_super) {
      this.msg.warning('无权限操作');
      return;
    }
    this.validateLogoForm.patchValue({
      logo: this.companyInfo.logo
    });
    this.logoTplModal = this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzWidth: '800px',
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  submitLogoChange(): void {
    for (const i in this.validateLogoForm.controls) {
      this.validateLogoForm.controls[i].markAsDirty();
      this.validateLogoForm.controls[i].updateValueAndValidity();
    }

    if (this.validateLogoForm.valid && this.companyInfo.is_super) {
      this.logoSubmitLoading = true;
      let obj: FormData = new FormData();
      obj.append('logo', this.validateLogoForm.get('logo').value);
      this.settingService.post('/v1/web/com/update_info_logo', obj).subscribe((res: ApiData) => {
        this.logoSubmitLoading = false;
        if (res.code === 200) {
          this.msg.success('修改成功');
          this.companyInfo['logo'] = res.data.logo;
          this.companyDataService.companyInfo['logo'] = res.data.logo;
          this.logoTplModal!.destroy();
        }
      }, err => this.logoSubmitLoading = false);
    }


  }

  editDescription(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    if (!this.companyInfo.is_super) {
      this.msg.warning('无权限操作');
      return;
    }
    this.validateDescForm.patchValue({
      description: this.companyInfo.description
    });
    this.descriptionTplModal = this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzWidth: '800px',
      nzMaskClosable: false,
      nzClosable: true
    });
  }

  desError: string = '';
  submitDescriptionChange(): void {
    for (const i in this.validateDescForm.controls) {
      this.validateDescForm.controls[i].markAsDirty();
      this.validateDescForm.controls[i].updateValueAndValidity();
    }

    if (this.validateDescForm.valid && this.companyInfo.is_super) {
      this.descriptionSubmitLoading = true;
      this.settingService.post('/v1/web/com/update_info_desc', this.validateDescForm.value).subscribe((res: ApiData) => {
        this.descriptionSubmitLoading = false;
        if (res.code === 200) {
          this.msg.success('修改成功');
          this.companyInfo['description'] = res.data.description;
          this.companyDataService.companyInfo['description'] = res.data.description;
          this.descriptionTplModal!.destroy();
        } else {
          this.desError = res.message;
        }


      }, err => this.descriptionSubmitLoading = false);
    }
  }

  cancel(): void {
    this.logoSubmitLoading = false;
    this.logoTplModal?.destroy();
    this.descriptionSubmitLoading = false;
    this.descriptionTplModal?.destroy();
  }

  get getTextareaLength(): number {
    if (this.validateDescForm.get('description').value) {
      return this.validateDescForm.get('description').value.length;
    }
    return 0;
  }

}
