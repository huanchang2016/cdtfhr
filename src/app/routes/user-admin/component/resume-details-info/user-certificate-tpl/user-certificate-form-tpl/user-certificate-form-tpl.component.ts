import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-user-certificate-form-tpl',
  templateUrl: './user-certificate-form-tpl.component.html',
  styleUrls: ['./user-certificate-form-tpl.component.less']
})
export class UserCertificateFormTplComponent implements OnInit {
  @Input() data: any;
  @Input() resume_id: number;

  validateForm!: FormGroup;

  loading: boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    public globalService: GlobalSettingsService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      certificateName: [null, [Validators.required]],
      certificateDate: [null, [Validators.required]]
    })

    if (this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      certificateName: this.data.name,
      certificateDate: this.data.time
    })
  }


  submitForm(): any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.loading = true;
      const object: any = this.validateForm.value;

      const option = {
        name: object.certificateName,
        time: object.certificateDate
      };

      this.loading = true;
      if (this.data) {
        this.edit(option);
      } else {
        this.create(option);
      }
    }

  }

  edit(option: any): void {
    this.globalService.patch(`/v1/web/user/resume_certificate/${this.data.id}`, option).subscribe((res: ApiData) => {
      this.loading = false;
      this.destroyModal({ data: res.data, type: 'edit' });
      this.msg.success('修改成功');

    }, err => this.loading = false)
  }
  create(option: any): void {
    this.globalService.post(`/v1/web/user/resume_certificate/${this.resume_id}`, option).subscribe((res: ApiData) => {
      this.loading = false;
      this.destroyModal({ data: res.data, type: 'create' });
      this.msg.success('新增成功');

    }, err => this.loading = false)
  }

  cancel(e: MouseEvent): void {
    e.preventDefault();
    this.destroyModal();
  }

  destroyModal(data: any = null): void {
    this.modal.destroy({ data: data });
  }
}
