import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-education-exp-form-tpl',
  templateUrl: './education-exp-form-tpl.component.html',
  styleUrls: ['./education-exp-form-tpl.component.less']
})
export class EducationExpFormTplComponent implements OnInit {
  @Input() data:any;

  validateForm!: FormGroup;

  loading:boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      school_name: [null, [Validators.required]],
      edu_record: [null, [Validators.required]],
      edu_major: [null, [Validators.required]],
      edu_start_time: [null, [Validators.required]],
      edu_end_time: [null, [Validators.required]],
      is_not_end: [false] // 根据 是否毕业 确定  毕业时间是否为必填项
    })

    if(this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      school_name: null,
      edu_record: null,
      edu_major: null,
      edu_start_time: null,
      edu_end_time: null,
      is_not_end: null
    })
  }


  submitForm():any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 教育经历');
    if(this.validateForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.destroyModal({ id: 1, name: '张三' })
      }, 800);
    }
    
  }

  
  isNotEndChange(required: boolean): void {
    if (required) {
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

  destroyModal(data:any = null): void {
    this.modal.destroy({ data: data });
  }
}
