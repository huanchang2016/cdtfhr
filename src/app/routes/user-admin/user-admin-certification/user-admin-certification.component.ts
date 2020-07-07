import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-admin-certification',
  templateUrl: './user-admin-certification.component.html',
  styleUrls: ['./user-admin-certification.component.less']
})
export class UserAdminCertificationComponent implements OnInit {
  validateForm!: FormGroup;

  submitLoading:boolean = false;

  step: 0 | 1 | 2 = 0;

  // 先获取信息，根据信息判断当前用户的实名认证 进行到了哪一步？
  ceritificationInfo:any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      id_card: [null, [Validators.required, Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]]
    });
  }
  
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, '实名认证');
    if(this.validateForm.valid) {
      this.submitLoading = true;
      setTimeout(() => {
        this.submitLoading = false;
        ++this.step;
        this.ceritificationInfo = this.validateForm.value;
      }, 800);
    }
  }

}
