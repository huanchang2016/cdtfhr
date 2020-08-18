import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { Config } from 'src/app/data/interface';

@Component({
  selector: 'app-resumes-search-form-tpl',
  templateUrl: './resumes-search-form-tpl.component.html',
  styleUrls: ['./resumes-search-form-tpl.component.less']
})
export class ResumesSearchFormTplComponent implements OnInit {

  @Output() searchValueChange:EventEmitter<any> = new EventEmitter();

  workExpOptions:Config[] = [
    { id: 1, key: '不限', value: null },
    { id: 2, key: '应届生', value: '0-1' },
    { id: 3, key: '1-3年', value: '1-3' },
    { id: 4, key: '3-5年', value: '3-5' },
    { id: 5, key: '5-10年', value: '5-10' }
  ];
  isCustomer:boolean = false; // 是否自定义查询

  validateForm!: FormGroup;
  
  constructor(
    public globalService: GlobalSettingsService,
    private fb: FormBuilder
  ) {
    console.log(this.globalService.globalConfigOptions, 'configs');
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

  resetForm(): void {
    this.validateForm.patchValue({
      keywords: null,
      is_any_key: [false],
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
    this.emit();
  }

  emit():void {
    const option:any = {
      keywords: null,
      is_any_key: [false],
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
    };
    this.searchValueChange.emit(option);
  }
}
