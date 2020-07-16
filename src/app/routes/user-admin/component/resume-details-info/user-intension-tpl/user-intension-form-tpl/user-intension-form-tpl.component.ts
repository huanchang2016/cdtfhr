import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-intension-form-tpl',
  templateUrl: './user-intension-form-tpl.component.html',
  styleUrls: ['./user-intension-form-tpl.component.less']
})
export class UserIntensionFormTplComponent implements OnInit {
  @Input() data:any;

  validateForm!: FormGroup;

  loading:boolean = false;

  checkOptionsOne = [
    { label: '全职', value: 1 },
    { label: '兼职', value: 2 },
    { label: '实习', value: 3 }
  ];
  
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      work_address: [null, [Validators.required]],
      industry: [null, [Validators.required]],
      job_position: [null, [Validators.required]],
      job_salary: [null, [Validators.required]],
      job_status: [null, [Validators.required]],
      job_nature: [null, [Validators.required]]
    });

    if(this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      work_address: null,
      industry: null,
      job_position: null,
      job_salary: null,
      job_status: null,
      job_nature: null
    })
  }

  log(value: string[]): void {
    this.validateForm.patchValue({
      job_nature: value
    });
  }

  submitForm():any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 个人信息');
    if(this.validateForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.destroyModal({ id: 1, name: '张三' })
      }, 800);
    }
    
  }

  cancel(e: MouseEvent): void {
    e.preventDefault();
    this.destroyModal();
  }

  destroyModal(data:any = null): void {
    this.modal.destroy({ data: data });
  }
}
