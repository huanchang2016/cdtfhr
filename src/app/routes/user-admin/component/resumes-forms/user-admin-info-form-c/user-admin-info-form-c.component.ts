import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user-admin-info-form-c',
  templateUrl: './user-admin-info-form-c.component.html',
  styleUrls: ['./user-admin-info-form-c.component.less']
})
export class UserAdminInfoFormCComponent implements OnInit {
  validateForm!: FormGroup;

  @Input() resumeUserInfo: any;

  @Output() valueChanges: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    public globalService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(/[\u4E00-\u9FA5]{1,}/)]],
      sex: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      marriage_id: [null, [Validators.required]],
      registered_residence: [null, [Validators.required]], // 户口所在地 [registered_province_id, registered_city_id]
      work_date: [null, [Validators.required]],
      is_not_work: [false], // 根据 是否工作 确定  工作时间是否为必填项
      address_city: [null, [Validators.required]], // 现居住地 [work_province_id, work_city_id]
      email: [null, [Validators.email, Validators.required]],
      avatar: [null]
    });

    this.validateForm.get('work_date').valueChanges.subscribe(date => {
      if (date && this.validateForm.get('is_not_work').value) {
        this.validateForm.patchValue({
          is_not_work: false
        });
      }
    });

    this.validateForm.valueChanges.pipe(debounceTime(300)).subscribe(_ => this.valueChanges.emit(true));

    if (this.resumeUserInfo) {
      this.resetForm();
    }
  }
  resetForm(): void {
    this.validateForm.patchValue({
      name: this.resumeUserInfo.name,
      sex: this.resumeUserInfo.sex,
      birthday: this.resumeUserInfo.birthday,
      marriage_id: this.resumeUserInfo.marriage.id,
      registered_residence: [this.resumeUserInfo.registered_province.id, this.resumeUserInfo.registered_city.id],
      work_date: this.resumeUserInfo.work_date,
      is_not_work: this.resumeUserInfo.work_date ? false : true,
      address_city: [this.resumeUserInfo.work_province.id, this.resumeUserInfo.work_city.id, this.resumeUserInfo.work_area?.id],
      email: this.resumeUserInfo.email,
      avatar: this.resumeUserInfo.avatar
    });
    // 
    if (!this.resumeUserInfo.work_date) {
      this.isNotWorkChange(!this.resumeUserInfo.work_date);
    }
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
    if (this.validateForm.valid) {
      return new Promise((resolve) => {
        resolve(this.validateForm.value);
      });
    }
  }

}
