import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../transfer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.less']
})
export class Step2Component implements OnChanges, OnInit {
  @Input() companyInfo:any;

  @Output() companyInfoChange:EventEmitter<any> = new EventEmitter();
  
  validateForm!: FormGroup;
  loading:boolean = false;

  isGetCode:boolean = false; // 获取验证码

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    public transferSrv: TransferService,
    public settingService: GlobalSettingsService
  ) {
   this.settingService.setTitle('企业用户信息完善-天府菁英网');
  }

  ngOnChanges():void {
    if(this.companyInfo && this.validateForm) {
      this.resetForm();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      companyname: [null, Validators.required],
      or_code: [null, [Validators.required, Validators.maxLength(18)] ],
      end_date: [null, Validators.required ],
      cascader: [null, Validators.required ],
      address: [null, Validators.required ],
      nature: [null, Validators.required ],
      scale: [null, Validators.required ],
      industry: [null, Validators.required ],
      license_photo: [null, Validators.required ],
      logo: [null, Validators.required ],
      description: [null, [Validators.required, Validators.maxLength(1000)] ],
      // 公司联系人
      user_name: [null, Validators.required ],
      user_phone: [null, [Validators.required, Validators.pattern(/^1[3456789]\d{9}$/)] ],
      check_number: [null, Validators.required ],
      zj_tel: [null ],
      user_email: [null, Validators.email ]

    });
    
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, 'steps2');
    if(this.validateForm.valid) {

      const value = this.validateForm.value;

      let obj:FormData = new FormData();
      obj.append('name', value.companyname);
      obj.append('code', value.or_code);
      obj.append('expires_date', value.end_date);
      obj.append('province_id', value.cascader[0]);
      obj.append('city_id', value.cascader[1]);
      obj.append('area_id', value.cascader[2]);
      obj.append('address', value.address);
      obj.append('type_id', value.nature);
      obj.append('scale_id', value.scale);
      obj.append('industry_id', value.industry);
      if((typeof value.license_photo) !== 'string') {
        obj.append('license', value.license_photo);
      }
      if((typeof value.logo) !== 'string') {
        obj.append('logo', value.logo);
      }
      
      // obj.append('logo', value.logo);
      obj.append('description', value.description);
      obj.append('full_name', value.user_name);
      obj.append('phone', value.user_phone);
      obj.append('verify_code', value.check_number);
      obj.append('telephone', value.zj_tel);
      obj.append('email', value.user_email);

      this.loading = true;
      if(this.companyInfo) {
        this.editInfo(obj);
      }else {
        this.createInfo(obj);
      }
    }
  }
  createInfo(obj:any):void {
    this.settingService.post('/v1/web/com/info', obj).subscribe((res: ApiData) => {
        console.log(res, '/v1/web/com/info company info create  post');
        this.loading = false;
        // 资料填写后，直接跳转到下一步，进行公司信息展示
        this.companyInfoChange.emit(res.data);
        ++this.transferSrv.step;
      }, err => this.loading = false);
  }
  editInfo(obj:any):void {
    this.settingService.post('/v1/web/com/update_info', obj).subscribe((res: ApiData) => {
        console.log(res, '/v1/web/com/info company info edit    patch');
        this.loading = false;
        // 资料填写后，直接跳转到下一步，进行公司信息展示
        this.companyInfoChange.emit(res.data);
        ++this.transferSrv.step;
      }, err => this.loading = false);
  }

  get getTextareaLength():number {
    if(this.validateForm.get('description').value) {
      return this.validateForm.get('description').value.length;
    }
    return 0;
  }

  resetForm() {
    console.log('reset form value', this.companyInfo);
    this.settingService.setTitle(`${this.companyInfo.name}-企业用户信息完善-天府菁英网`);

    const cascader:number[] = [this.companyInfo.province.id, this.companyInfo.city.id, this.companyInfo.area.id ]
    this.validateForm.patchValue({
      companyname: this.companyInfo.name,
      or_code: this.companyInfo.code,
      end_date: this.companyInfo.expires_date,
      cascader: cascader,
      address: this.companyInfo.address,
      nature: this.companyInfo.type.id,
      scale: this.companyInfo.scale.id,
      industry: this.companyInfo.industry.id,
      license_photo: this.companyInfo.licence,
      logo: this.companyInfo.logo,
      description: this.companyInfo.description,
      // 公司联系人
      user_name: this.companyInfo.company.full_name,
      user_phone: this.companyInfo.company.phone,
      zj_tel: this.companyInfo.company.telephone,
      user_email: this.companyInfo.company.email
    });
  }

  count: number = 60;

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
    const user_phone = this.validateForm.get('user_phone');
    if (!user_phone.valid) {
      this.msg.error('手机号码未填写');
      return;
    }
    if (this.isGetCode) {
      return;
    } else {
      console.log('send code');
      this.settingService.post('/v1/web/com/send_vcode', { phone: user_phone.value }).subscribe((res: ApiData) => {
        this.isGetCode = true;
        this.msg.success('发送成功');
        this.counter();
      }, err => this.isGetCode = false)
    }
  }

  counter() {
    this.count = 60;
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(60));
    takeFourNumbers.subscribe(
      x => {
        this.count = 60 - x - 1;
      },
      error => { },
      () => {
        this.isGetCode = false;
      });
  }
}
