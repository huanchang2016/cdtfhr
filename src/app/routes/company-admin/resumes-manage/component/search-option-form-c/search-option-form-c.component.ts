import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { Config } from 'src/app/data/interface';

@Component({
  selector: 'app-search-option-form-c',
  templateUrl: './search-option-form-c.component.html',
  styleUrls: ['./search-option-form-c.component.less']
})
export class SearchOptionFormCComponent implements OnInit {

  @Output() searchValueChange: EventEmitter<any> = new EventEmitter();
  workExpOptions: Config[] = [
    { id: 1, key: '不限', value: null },
    { id: 2, key: '应届生', value: '0-1' },
    { id: 3, key: '1-3年', value: '1-3' },
    { id: 4, key: '3-5年', value: '3-5' },
    { id: 5, key: '5-10年', value: '5-10' },
    { id: 6, key: '10年以上', value: '10-0' }
  ];

  isCustomer: boolean = false; // 是否自定义查询

  validateForm!: FormGroup;

  constructor(
    public globalService: GlobalSettingsService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
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


  customerExpSettings(): void {
    this.isCustomer = true;
    this.validateForm.patchValue({
      customer_exp_start: null,
      customer_exp_end: null
    });
  }
  confirm(e: MouseEvent): void {
    e.preventDefault();
    // 确认自定义起始值，自动判断大小
    const customerExp: number[] = [+this.validateForm.value.customer_exp_start, +this.validateForm.value.customer_exp_end];
    const _min = Math.min(...customerExp);
    const _max = Math.max(...customerExp);
    const lastEl: Config = this.workExpOptions[this.workExpOptions.length - 1];
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
  }
  cancel(e: MouseEvent): void {
    e.preventDefault();
    this.isCustomer = false;
    this.validateForm.patchValue({
      customer_exp_start: null,
      customer_exp_end: null
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();

    this.validateForm.patchValue({
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
    this.emit(true);
  }

  submitForm(): void {

    if (this.validateForm.value.age_start && this.validateForm.value.age_end) {
      this.validateForm.patchValue({
        age_start: Math.min(this.validateForm.value.age_start, this.validateForm.value.age_end),
        age_end: Math.max(this.validateForm.value.age_start, this.validateForm.value.age_end)
      });
    }
    this.emit();
  }

  emit(reset: boolean = false): void {
    const value: any = this.validateForm.value;

    const option: any = {
      city_id: value.work_address ? value.work_address[1] : null,
      now_city_id: value.stay_address ? value.stay_address[1] : null,
      industry_id: value.now_industry,
      hope_industry_id: value.plan_industry,
      job_status: value.status,
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
    this.searchValueChange.emit({ data: option, isReset: reset });
  }
}
