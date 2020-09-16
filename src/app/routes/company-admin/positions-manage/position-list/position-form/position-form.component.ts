import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';
import { CompanyDataService } from '../../../service/company-data.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.less']
})
export class PositionFormComponent implements OnInit {
  @Input() data:any;
  
  config:any = {
    duration_time: [
      { key: '15天', value: 15 },
      { key: '30天', value: 30 },
      { key: '90天', value: 90 }
    ]
  };

  submitLoading:boolean = false;
  error:string = '';

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public globalService: GlobalSettingsService,
    private msg: NzMessageService,
    private companyDataService: CompanyDataService,
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      position_name: [{ value: this.data ? this.data.name : null, disabled: this.data }, Validators.required ],
      recruiters: [ null, Validators.required ],
      job_category: [{ value: this.data ? [this.data.jobType1.id, this.data.jobType2.id, this.data.jobType3.id] : null, disabled: this.data }, Validators.required ],
      cascader: [{ value: this.data ? [this.data.province.id, this.data.city.id, this.data.area.id] : null, disabled: this.data }, Validators.required ],
      address: [{ value: this.data ? this.data.address : null, disabled: this.data }, Validators.required ],
      nature: [{ value: this.data ? this.data.type.id : null, disabled: this.data }, Validators.required ],
      salary: [null, Validators.required ],
      education: [null, Validators.required ],
      work_exp: [null, Validators.required ],
      description: [null, [Validators.required, Validators.maxLength(1000)] ],
      user_email: [null ],
      duration_time: [null, Validators.required ]
    });

    if(this.data) {
      this.setFormValue();
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log('validate form value', this.validateForm)
    if(this.validateForm.valid) {
      const value:any = this.validateForm.value;
      if(!this.data) {
        const option = {
          name: value.position_name,
          number: value.recruiters,
          job_type_1_id: value.job_category[0],
          job_type_2_id: value.job_category[1],
          job_type_3_id: value.job_category[2],
          province_id: value.cascader[0],
          city_id: value.cascader[1],
          area_id: value.cascader[2],
          address: value.address,
          type_id: value.nature,
          salary_id: value.salary,
          education_id: value.education,
          work_experience_id: value.work_exp,
          description: value.description,
          email: value.user_email,
          date: value.duration_time
        };
        this.create(option);

      }else {
        const obj = {
          // name: value.position_name,
          number: value.recruiters,
          // job_type_1_id: value.job_category[0],
          // job_type_2_id: value.job_category[1],
          // job_type_3_id: value.job_category[2],
          // province_id: value.cascader[0],
          // city_id: value.cascader[1],
          // area_id: value.cascader[2],
          // address: value.address,
          // type_id: value.nature,
          salary_id: value.salary,
          education_id: value.education,
          work_experience_id: value.work_exp,
          description: value.description,
          email: value.user_email,
          date: value.duration_time
        };
        this.edit(obj);

      }
    }
  }

  create(opt:any):void {
    this.submitLoading = true;
    this.globalService.post('/v1/web/com/job', opt).subscribe((res:ApiData) => {
      this.submitLoading = false;
      console.log(res);
      if(res.code === 200) {
        this.msg.success('添加成功');
        this.companyDataService.getPositionConfig().then();
        this.destoryModal(res.data)
      }else {
        this.error = res.message;
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }

  edit(opt:any):void {
    this.submitLoading = true;
    this.globalService.patch(`/v1/web/com/job/${this.data.id}`, opt).subscribe((res:ApiData) => {
      this.submitLoading = false;
      console.log(res);
      if(res.code === 200) {
        this.msg.success('更新成功');
        this.destoryModal(res.data)
      }else {
        this.error = res.message;
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }

  setFormValue():void {
    console.log('edit position form', this.data);
    this.validateForm.patchValue({
      recruiters: this.data.number,
      salary: this.data.salary.id,
      education: this.data.education.id,
      work_exp: this.data.workExperience.id,
      description: this.data.description,
      user_email: this.data.email,
      duration_time: this.data.date
    });
  }

  cancel(e:Event):void {
    e.preventDefault();
    this.destoryModal();
  }

  destoryModal(data?:any):void {
    this.modal.destroy(data);
  }

}
