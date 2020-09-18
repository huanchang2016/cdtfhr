import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '@env/environment';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';
import { UserDataService } from 'src/app/routes/user-admin/service/user-data.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-user-info-form-tpl',
  templateUrl: './user-info-form-tpl.component.html',
  styleUrls: ['./user-info-form-tpl.component.less']
})
export class UserInfoFormTplComponent implements OnInit {
  @Input() data:any;
  
  environment = environment;

  validateForm!: FormGroup;

  loading:boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private userDataService: UserDataService,
    public settingService: GlobalSettingsService,
    private msg: NzMessageService
  ) {}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      marriage_id: [null, [Validators.required]],
      registered_residence: [null, [Validators.required]], // 户口所在地
      work_date: [null, [Validators.required]],
      is_not_work: [false], // 根据 是否工作 确定  工作时间是否为必填项
      address_city: [null, [Validators.required]], // 现居住城市
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

    if(this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      name: this.data.name,
      sex: this.data.sex,
      birthday: this.data.birthday,
      marriage_id: this.data.marriage.id,
      registered_residence: [this.data.registered_province.id, this.data.registered_city.id],
      work_date: this.data.work_date,
      is_not_work: this.data.work_date ? false : true,
      address_city: [this.data.work_province.id, this.data.work_city.id],
      email: this.data.email,
      avatar: this.data.avatar
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

  submitForm():any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 个人信息');
    if(this.validateForm.valid) {
      this.loading = true;

        let userInfo:FormData = new FormData();
        const object = this.validateForm.value;
        for (const key in object) {
            if(key === 'registered_residence') {
              userInfo.append('registered_province_id', object[key][0]);
              userInfo.append('registered_city_id', object[key][1]);
            }else if(key === 'address_city') {
              userInfo.append('work_province_id', object[key][0]);
              userInfo.append('work_city_id', object[key][1]);
              userInfo.append('work_area_id', object[key][2]);
            } else if (key === 'work_date') {
              const work_date:string = object['is_not_work'] ? '' : object[key];
              userInfo.append('work_date', work_date);
            }else if(key === 'is_not_work') {
              continue;
            } else if(key === 'avatar') {
              if(typeof object[key] === 'string') {
                continue
              }else {
                userInfo.append(key, object[key]);
              }
            } else {
              userInfo.append(key, object[key]);
            }
        }

        this.settingService.post(`/v1/web/user/resume_info/${this.data.id}`, userInfo).subscribe((res:ApiData) => {
          console.log(res);
          this.loading = false;
          if(res.code === 200) {
            this.destroyModal(res.data);
            this.userDataService.getProfile().then();
            this.msg.success('修改成功');
          }else {
            this.msg.error(res.message);
          }
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
