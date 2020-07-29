import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {

  linkInfo:any = null;

  tplModal?: NzModalRef;
  submitLoading = false;

  validateForm!: FormGroup;

  is_get_old_captcha:boolean = false;
  is_get_new_captcha:boolean = false;

  constructor(
    private modal: NzModalService,
    private msg: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getDataInfo();

    this.validateForm = this.fb.group({
      old_password: [null, [Validators.required]],
      new_password: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  getDataInfo():void {
    setTimeout(() => {
      this.linkInfo = {
        account_name: '江二娃',
        phone: '13880256598',
        tel: '028-80518071',
        email: 'zhanghuanchang@cdtfhr.com'
      };

      this.setFormValue();
    }, 1000);
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.new_password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  edit(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>): void {
    this.tplModal = this.modal.create({
      nzTitle: tplTitle,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzContent: tplContent,
      nzFooter: null,
      nzMaskClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  setFormValue():void {
    this.validateForm.patchValue({
      account_name: this.linkInfo.account_name,
      old_phone: this.linkInfo.phone,
      tel: this.linkInfo.tel,
      email: this.linkInfo.email
    });
  }

  cancel(e:Event):void {
    e.preventDefault();
    this.submitLoading = false;
    this.tplModal!.destroy();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, 'submit change password info');
    if(this.validateForm.valid) {
      this.destroyTplModal();
    }
  }

  destroyTplModal(): void {
    this.submitLoading = true;
    setTimeout(() => {
      this.submitLoading = false;
      this.tplModal!.destroy();
    }, 1000);
  }
}
