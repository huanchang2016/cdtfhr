import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-user-project-form-tpl',
  templateUrl: './user-project-form-tpl.component.html',
  styleUrls: ['./user-project-form-tpl.component.less']
})
export class UserProjectFormTplComponent implements OnInit {
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
      projectName: [null, [Validators.required]],
      projectRangeDate: [null, [Validators.required]],
      projectDescription: [null, [Validators.required]]
    })

    if (this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      projectName: this.data.name,
      projectRangeDate: [this.data.start_time, this.data.end_time],
      projectDescription: this.data.description
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
        name: object.projectName,
        start_time: object.projectRangeDate[0],
        end_time: object.projectRangeDate[1],
        description: object.projectDescription
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
    this.globalService.patch(`/v1/web/user/resume_project/${this.data.id}`, option).subscribe((res: ApiData) => {
      this.loading = false;
      this.destroyModal({ data: res.data, type: 'edit' });
      this.msg.success('修改成功');

    }, err => this.loading = false)
  }
  create(option: any): void {
    this.globalService.post(`/v1/web/user/resume_project/${this.resume_id}`, option).subscribe((res: ApiData) => {
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
