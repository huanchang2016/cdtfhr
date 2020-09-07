import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-link-user-info',
  templateUrl: './link-user-info.component.html',
  styleUrls: ['./link-user-info.component.less']
})
export class LinkUserInfoComponent implements OnInit {

  linkInfo:any = null;

  tplModal?: NzModalRef;
  submitLoading = false;

  validateForm!: FormGroup;

  is_get_old_captcha:boolean = false;
  is_get_new_captcha:boolean = false;

  constructor(
    private modal: NzModalService,
    private msg: NzMessageService,
    private fb: FormBuilder,
    private settingService: GlobalSettingsService
  ) {}

  ngOnInit(): void {
    this.getDataInfo();

    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      old_phone: [null, [Validators.required, Validators.pattern(/^1[3456789]\d{9}$/)]],
      old_captcha: [null, [Validators.required]],
      new_phone: [null, [Validators.required, Validators.pattern(/^1[3456789]\d{9}$/)]],
      new_captcha: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      email: [null, [Validators.email]]
    });
  }

  loadingData:boolean = true;

  getDataInfo():void {
    this.loadingData = true;
    this.settingService.get('/v1/web/com/contact').subscribe((res:ApiData) => {
      this.loadingData = false;
      console.log('获取联系人信息', res);
      if(res.code === 200) {
        this.linkInfo = res.data;
      }else {
        this.msg.error(res.message);
      }
    }, err=> this.loadingData = false);
  }

  edit(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>): void {
    
    this.setFormValue(); // 编辑时表单赋值

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

  old_count:number = 299;

  getOldCaptcha(e: MouseEvent): void {
    e.preventDefault();
    const user_phone = this.validateForm.get('old_phone');
    this.validateForm.controls['old_phone'].markAsDirty();
    this.validateForm.controls['old_phone'].updateValueAndValidity();
    if(!user_phone.valid) {
      return;
    }
    if(this.is_get_old_captcha) {
      this.msg.success('验证码已发送');
      return;
    }else {
      this.settingService.post('/v1/web/com/send_old_phone', { phone: user_phone.value }).subscribe((res:ApiData) => {
        if(res.code === 200) {
          this.msg.success('发送成功');
          this.is_get_old_captcha = true;
          this.counterOld();
        }else {
          this.msg.error(res.message);
        }
      })
    }
  }

  counterOld() {
    console.log('counter old');
    const new_numbers = interval(1000);
    const new_takeFourNumbers = new_numbers.pipe(take(299));
    new_takeFourNumbers.subscribe(
      x => {
        this.old_count = 299 - x - 1;
      },
      error => {},
      () => {
        this.is_get_old_captcha = false;
      });
  }

  new_count:number = 299;

  getNewCaptcha(e: MouseEvent): void {
    e.preventDefault();
    const user_phone = this.validateForm.get('new_phone');
    this.validateForm.controls['new_phone'].markAsDirty();
    this.validateForm.controls['new_phone'].updateValueAndValidity();
    
    if(!user_phone.valid) {
      return;
    }
    if(this.is_get_new_captcha) {
      this.msg.success('验证码已发送');
      return;
    }else {
      this.settingService.post('/v1/web/com/send_new_phone', { phone: user_phone.value }).subscribe((res:ApiData) => {
        if(res.code === 200) {
          this.msg.success('发送成功');
          this.is_get_new_captcha = true;
        this.counterNew();
        }else {
          this.msg.error(res.message);
        }
      })
    }
  }

  counterNew() {
    console.log('counter new');
    const old_numbers = interval(1000);
    const old_takeFourNumbers = old_numbers.pipe(take(299));
    old_takeFourNumbers.subscribe(
      x => {
        this.new_count = 299 - x - 1;
      },
      error => {},
      () => {
        this.is_get_new_captcha = false;
      });
  }

  setFormValue():void {
    this.validateForm.patchValue({
      username: this.linkInfo.full_name,
      old_phone: this.linkInfo.phone,
      tel: this.linkInfo.telephone,
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
    console.log(this.validateForm, 'submit link info');
    if(this.validateForm.valid) {
      this.destroyTplModal();
    }
  }

  destroyTplModal(): void {
    this.submitLoading = true;
    const value:any = this.validateForm.value;
    const option:any = {
      full_name: value.username,
      old_phone: value.old_phone,
      old_code: value.old_captcha,
      phone: value.new_phone,
      new_code: value.new_captcha,
      telephone: value.telephone,
      email: value.email
    };
    this.settingService.post('/v1/web/com/contact', option).subscribe((res:ApiData) => {
      this.submitLoading = false;
      if(res.code === 200) {
        this.msg.success('更新成功');
        this.tplModal!.destroy();
      }else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }
}
