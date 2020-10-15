import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { Config } from 'src/app/data/interface';

@Component({
  selector: 'app-resumes-search-form-tpl',
  templateUrl: './resumes-search-form-tpl.component.html',
  styleUrls: ['./resumes-search-form-tpl.component.less']
})
export class ResumesSearchFormTplComponent implements OnChanges, OnInit {

  @Input() resetSearchOption:any;

  @Output() searchValueChange:EventEmitter<any> = new EventEmitter();
 
  workExpOptions:Config[] = [
    { id: 1, key: '不限', value: null },
    { id: 2, key: '应届生', value: '0-1' },
    { id: 3, key: '1-3年', value: '1-3' },
    { id: 4, key: '3-5年', value: '3-5' },
    { id: 5, key: '5-10年', value: '5-10' },
    { id: 6, key: '10年以上', value: '10-0' }
  ];

  isCustomer:boolean = false; // 是否自定义查询

  validateForm!: FormGroup;
  
  constructor(
    public globalService: GlobalSettingsService,
    private msg: NzMessageService,
    private fb: FormBuilder
  ) {
    console.log(this.globalService.globalConfigOptions, 'configs');
  }

  ngOnChanges():void {
    if(this.resetSearchOption && this.validateForm) {
      this.patchFormValue(this.resetSearchOption);
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      keywords: [null],
      is_any_key: [false],
      work_address: [null],
      stay_address: [null],
      now_industry: [null],
      plan_industry: [null],
      status: [null],
      update_time: [null],
      age_start: [null],
      age_end: [null],
      company_name: [null],
      company_nature: [null],
      school_name: [null],
      school_major: [null],
      now_salary: [null],
      plan_salary: [null],

      education: [null],
      work_exp: [null],
      customer_exp_start: [null],
      customer_exp_end: [null],
      sex: [null]
    });
  }

  patchFormValue(item:any):void {
    if(item.work) {
      const _work:any[] = this.workExpOptions.filter(v => v.value === item.work);
      if(_work.length === 0) {
        const lastEl:Config = this.workExpOptions[this.workExpOptions.length - 1];
        this.workExpOptions.push({
          id: lastEl.id + 1,
          key: `${item.work}年`,
          value: item.work
        });
      }
    }
    this.validateForm.patchValue({
      keywords: item.name,
      is_any_key: item.is_any_key ? item.is_any_key : false,
      work_address: item.city ? [item.city.province.id, item.city.id] : null,
      stay_address: item.now_city ? [item.now_city.province.id, item.now_city.id] : null,
      now_industry: item.industry_id,
      plan_industry: item.hope_industry_id,
      status: item.status,
      update_time: item.updated_at,
      age_start: item.min_age,
      age_end: item.max_age,
      company_name: item.company_name,
      company_nature: item.company_type_data ? item.company_type_data.id : null,
      school_name: item.school,
      school_major: item.major,
      now_salary: item.salary,
      plan_salary: item.hope_salary,

      education: item.edu_id,
      work_exp: item.work, // 判断当前配置里面是否 为自定义数据
      customer_exp_start: item.customer_exp_start,
      customer_exp_end: item.customer_exp_end,
      sex: item.sex
    });

    this.emit();
  }

  customerExpSettings():void {
    console.log('自定义工作经验', this.validateForm);
    this.isCustomer = true;
    this.validateForm.patchValue({
      customer_exp_start: null,
      customer_exp_end: null
    });
  }
  confirm(e:MouseEvent):void {
    e.preventDefault();
    // 确认自定义起始值，自动判断大小
    const customerExp:number[] = [+this.validateForm.value.customer_exp_start, +this.validateForm.value.customer_exp_end];
    const _min = Math.min(...customerExp);
    const _max = Math.max(...customerExp);
    const lastEl:Config = this.workExpOptions[this.workExpOptions.length - 1];
    this.workExpOptions.push({
      id: lastEl.id + 1,
      key: `${_min}-${_max}年`,
      value: `${_min}-${_max}`
    });

    this.validateForm.patchValue({
      work_exp: `${_min}-${_max}`,
      customer_exp_start: _min,
      customer_exp_end: _max
    });
    this.isCustomer = false;
    console.log('确认 自定义工作经验', this.validateForm);
  }
  cancel(e:MouseEvent):void {
    e.preventDefault();
    this.isCustomer = false;
    this.validateForm.patchValue({
      customer_exp_start: null,
      customer_exp_end: null
    });
  }

  resetForm(e:MouseEvent): void {
    e.preventDefault();
    this.validateForm.patchValue({
      keywords: null,
      is_any_key: false,
      work_address: null,
      stay_address: null,
      now_industry: null,
      plan_industry: null,
      status: null,
      update_time: null,
      age_start: null,
      age_end: null,
      company_name: null,
      company_nature: null,
      school_name: null,
      school_major: null,
      now_salary: null,
      plan_salary: null,

      education: null,
      work_exp: null,
      customer_exp_start: null,
      customer_exp_end: null,
      sex: null
    });
    this.emit();
  }

  submitForm(): void {
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }

    console.log(this.validateForm, 'validateForm');
    const keywords:string = this.validateForm.get('keywords').value;
    if(!keywords || !keywords.trim()) {
      this.msg.error('搜索简历时，关键字为必填项！');
      return;
    }else {
      if(this.validateForm.value.age_start && this.validateForm.value.age_end) {
        this.validateForm.patchValue({
          age_start: Math.min(this.validateForm.value.age_start, this.validateForm.value.age_end),
          age_end: Math.max(this.validateForm.value.age_start, this.validateForm.value.age_end)
        });
      }
      this.emit();
    }
  }

  emit():void {
    const value:any = this.validateForm.value;

    const option:any = {
      name: value.keywords,
      is_any_key: value.is_any_key,
      city_id: value.work_address ? value.work_address[1] : null,
      now_city_id: value.stay_address ? value.stay_address[1] : null,
      industry_id: value.now_industry,
      hope_industry_id: value.plan_industry,
      status: value.status,
      updated_at: value.update_time,
      min_age: value.age_start,
      max_age: value.age_end,
      company_name: value.company_name,
      company_type: value.company_nature,
      school: value.school_name,
      major: value.school_major,
      salary: value.now_salary,
      hope_salary: value.plan_salary,
      edu_id: value.education,
      work: value.work_exp,
      sex: value.sex
    };
    this.searchValueChange.emit(option);
  }
}
