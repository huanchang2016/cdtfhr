import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-admin-info-form-c',
  templateUrl: './user-admin-info-form-c.component.html',
  styleUrls: ['./user-admin-info-form-c.component.less']
})
export class UserAdminInfoFormCComponent implements OnInit {
  validateForm!: FormGroup;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      birthday: [null, [Validators.required]],
      work_date: [null, [Validators.required]],
      is_not_work: [false] // 根据 是否工作 确定  工作时间是否为必填项
    });


    
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

  submitForm(): Promise<any> {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 个人信息');
    return new Promise((resolve) => {
      resolve(this.validateForm);
    });
    
  }

  


}
