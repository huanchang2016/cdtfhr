import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-info-form-tpl',
  templateUrl: './user-info-form-tpl.component.html',
  styleUrls: ['./user-info-form-tpl.component.less']
})
export class UserInfoFormTplComponent implements OnInit {
  @Input() data:any;

  validateForm!: FormGroup;

  loading:boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      marriy_status: [null, [Validators.required]],
      registered_residence: [null, [Validators.required]], // 户口所在地
      work_date: [null, [Validators.required]],
      is_not_work: [false], // 根据 是否工作 确定  工作时间是否为必填项
      address_city: [null, [Validators.required]], // 现居住城市
      email: [null, [Validators.email, Validators.required]],
      photo: [null]
    });

    if(this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      username: null,
      sex: null,
      birthday: null,
      marriy_status: null,
      registered_residence: null,
      work_date: null,
      is_not_work: null,
      address_city: null,
      email: null,
      photo: null,
    })
  }

  isNotWorkChange(required: boolean): void {
    if (required) {
      this.validateForm.get('work_date')!.clearValidators();
      this.validateForm.get('work_date')!.markAsPristine();
    } else {
      this.validateForm.get('work_date')!.setValidators(Validators.required);
      this.validateForm.get('work_date')!.markAsDirty();
    }
    this.validateForm.get('work_date')!.updateValueAndValidity();
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
