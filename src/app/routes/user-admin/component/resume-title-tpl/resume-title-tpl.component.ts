import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-resume-title-tpl',
  templateUrl: './resume-title-tpl.component.html',
  styleUrls: ['./resume-title-tpl.component.less']
})
export class ResumeTitleTplComponent implements OnInit {
  @Input() data: any;

  validateForm!: FormGroup;

  loading: boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private settingService: GlobalSettingsService,
    private msg: NzMessageService
  ) { }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]]
    })

    if (this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      title: this.data.title
    })
  }


  submitForm(): any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.loading = true;
      this.settingService.post(`/v1/web/user/resume/set_title/${this.data.id}`, this.validateForm.value).subscribe((res: ApiData) => {
        this.loading = false;
        this.destroyModal(res.data);
        this.msg.success(res.message);

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
