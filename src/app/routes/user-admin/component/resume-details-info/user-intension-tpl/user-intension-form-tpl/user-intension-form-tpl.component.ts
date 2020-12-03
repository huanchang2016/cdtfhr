import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';
import { UserDataService } from 'src/app/routes/user-admin/service/user-data.service';

@Component({
  selector: 'app-user-intension-form-tpl',
  templateUrl: './user-intension-form-tpl.component.html',
  styleUrls: ['./user-intension-form-tpl.component.less']
})
export class UserIntensionFormTplComponent implements OnInit {
  @Input() data: any;

  validateForm!: FormGroup;

  loading: boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    public globalService: GlobalSettingsService,
    private msg: NzMessageService,
    private userDataService: UserDataService
  ) { }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      work_address: [null, [Validators.required, Validators.maxLength(3)]],
      industry: [null, [Validators.required, Validators.maxLength(3)]],
      job_position: [null, [Validators.required, Validators.maxLength(3)]],
      job_salary: [null, [Validators.required]],
      job_status: [null, [Validators.required]],
      job_nature: [null, [Validators.required]]
    });

    if (this.data) {
      this.setForm();
    }
  }

  job_nature: any[] = [];
  setForm() {
    const work_address = this.data.target.city.map(v => v.id);
    const industry = this.data.target.industry.map(v => v.id);
    const job_position = this.data.target.job_type.map(v => v.id);
    this.job_nature = this.data.target.type.map(v => v.id);
    // 设置表单值
    this.validateForm.patchValue({
      work_address: work_address,
      industry: industry,
      job_position: job_position,
      job_salary: this.data.target.salary ? this.data.target.salary.id : null,
      job_status: this.data.target.status ? this.data.target.status.id : null,
      job_nature: this.job_nature
    })
  }

  log(value: string[]): void {
    this.validateForm.patchValue({
      job_nature: value
    });
  }

  submitForm(): any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.loading = true;
      const form: any = this.validateForm.value;
      const option = {
        city: form.work_address,
        industry: form.industry,
        job_type: form.job_position,
        target_salary_id: form.job_salary,
        status: form.job_status,
        type: form.job_nature,
        resume_id: this.data.id
      };

      this.globalService.post(`/v1/web/user/resume_target/${this.data.id}`, option).subscribe((res: ApiData) => {
        this.loading = false;
        if (res.code === 200) {
          this.destroyModal(res.data);
          this.userDataService.getProfile().then();
          this.msg.success('修改成功');
        } else {
          this.msg.error(res.message);
        }
      }, err => this.loading = false)
    }

  }

  cancel(e: MouseEvent): void {
    e.preventDefault();
    this.destroyModal();
  }

  destroyModal(data: any = null): void {
    this.modal.destroy({ data: data });
  }
}
