import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-education-exp-form-tpl',
  templateUrl: './education-exp-form-tpl.component.html',
  styleUrls: ['./education-exp-form-tpl.component.less']
})
export class EducationExpFormTplComponent implements OnInit {

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
      school_name: [null, [Validators.required]],
      edu_record: [null, [Validators.required]],
      edu_major: [null, [Validators.required]],
      edu_start_time: [null, [Validators.required]],
      edu_end_time: [null, [Validators.required]],
      is_not_end: [false] // 根据 是否毕业 确定  毕业时间是否为必填项
    })

    this.validateForm.get('edu_end_time').valueChanges.subscribe(date => {
      if (date && this.validateForm.get('is_not_end').value) {
        this.validateForm.patchValue({
          is_not_end: false
        });
      }
    })

    if (this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      school_name: this.data.name,
      edu_record: this.data.education.id,
      edu_major: this.data.major,
      edu_start_time: this.data.start_time,
      edu_end_time: this.data.end_time,
      is_not_end: !this.data.end_time ? true : false
    })

    this.isNotEndChange(!this.data.end_time);
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
        name: object.school_name,
        major: object.edu_major,
        education_id: object.edu_record,
        start_time: object.edu_start_time,
        end_time: object.is_not_end ? '' : object.edu_end_time
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
    this.globalService.patch(`/v1/web/user/resume_edu/${this.data.id}`, option).subscribe((res: ApiData) => {
      this.loading = false;
      this.destroyModal({ data: res.data, type: 'edit' });
      this.msg.success('修改成功');

    }, err => this.loading = false)
  }
  create(option: any): void {
    this.globalService.post(`/v1/web/user/resume_edu/${this.resume_id}`, option).subscribe((res: ApiData) => {
      this.loading = false;
      this.destroyModal({ data: res.data, type: 'create' });
      this.msg.success('新增成功');

    }, err => this.loading = false)
  }


  isNotEndChange(required: boolean): void {
    if (required) {
      this.validateForm.patchValue({
        edu_end_time: null  // 毕业时间  至今
      });
      this.validateForm.get('edu_end_time')!.clearValidators();
      this.validateForm.get('edu_end_time')!.markAsPristine();
    } else {
      this.validateForm.get('edu_end_time')!.setValidators(Validators.required);
      this.validateForm.get('edu_end_time')!.markAsDirty();
    }
    this.validateForm.get('edu_end_time')!.updateValueAndValidity();
  }

  cancel(e: MouseEvent): void {
    e.preventDefault();
    this.destroyModal();
  }

  destroyModal(data: any = null): void {
    this.modal.destroy({ data: data });
  }
}
