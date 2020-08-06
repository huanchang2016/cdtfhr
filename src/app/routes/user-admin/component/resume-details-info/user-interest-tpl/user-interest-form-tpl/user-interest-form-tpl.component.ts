import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-user-interest-form-tpl',
  templateUrl: './user-interest-form-tpl.component.html',
  styleUrls: ['./user-interest-form-tpl.component.less']
})
export class UserInterestFormTplComponent implements OnInit {
  @Input() data:any;

  validateForm!: FormGroup;

  loading:boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private settingService: GlobalSettingsService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      hobby: [null]
    });

    if(this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      hobby: this.data.hobby
    })
  }

  submitForm():any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 个人信息');
    if(this.validateForm.valid) {
      this.loading = true;
      this.settingService.post(`/v1/web/user/resume_hobby/${this.data.id}`, this.validateForm.value).subscribe((res:ApiData) => {
        console.log(res);
        this.loading = false;
        this.destroyModal(res.data);
        this.msg.success('修改成功');
      }, err => this.loading = false)
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
