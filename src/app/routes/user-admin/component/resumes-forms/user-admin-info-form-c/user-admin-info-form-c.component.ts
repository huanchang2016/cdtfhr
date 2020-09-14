import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-user-admin-info-form-c',
  templateUrl: './user-admin-info-form-c.component.html',
  styleUrls: ['./user-admin-info-form-c.component.less']
})
export class UserAdminInfoFormCComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public globalService: GlobalSettingsService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      marriage_id: [null, [Validators.required]],
      registered_residence: [null, [Validators.required]], // 户口所在地 [registered_province_id, registered_city_id]
      work_date: [null, [Validators.required]],
      is_not_work: [false], // 根据 是否工作 确定  工作时间是否为必填项
      address_city: [null, [Validators.required]], // 现居住城市 [work_province_id, work_city_id]
      email: [null, [Validators.email, Validators.required]],
      avatar: [null]
    });

    this.validateForm.get('work_date').valueChanges.subscribe( date => {
      if(date && this.validateForm.get('is_not_work').value) {
        this.validateForm.patchValue({
          is_not_work: false
        });
      }
    })
  }
  isNotWorkChange(required: boolean): void {
    if (required) {
      this.validateForm.patchValue({
        work_date: null  // 无工作经验，将参加工作时间置空
      });
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
    if(this.validateForm.valid) {
      return new Promise((resolve) => {
        resolve(this.validateForm.value);
      });
    }
    
    
  }

  


}
