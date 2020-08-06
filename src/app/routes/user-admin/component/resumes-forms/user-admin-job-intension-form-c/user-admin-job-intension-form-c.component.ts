import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-admin-job-intension-form-c',
  templateUrl: './user-admin-job-intension-form-c.component.html',
  styleUrls: ['./user-admin-job-intension-form-c.component.less']
})
export class UserAdminJobIntensionFormCComponent implements OnInit {
  @Input() resumeUserInfo:any;
  
  @Output()stepsChange:EventEmitter<any> = new EventEmitter();
  
  validateForm!: FormGroup;

  submitLoading:boolean = false;

  constructor(
    private fb: FormBuilder,
    public globalService: GlobalSettingsService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      work_address: [null, [Validators.required, Validators.maxLength(3)]], // [2544, 2580, 2895]
      industry: [null, [Validators.required, Validators.maxLength(3)]],
      job_position: [null, [Validators.required, Validators.maxLength(3)]], // [646, 957, 959, 647]
      job_salary: [null, [Validators.required]],
      job_status: [null, [Validators.required]],
      job_nature: [null, [Validators.required]]
    });
  }
  
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 求职意向', this.resumeUserInfo, 'resumeUserInfo');
    if(this.validateForm.valid) {
      const form:any = this.validateForm.value;
      const option = {
        city: form.work_address,
        industry: form.industry,
        job_type: form.job_position,
        target_salary_id: form.job_salary,
        status: form.job_status,
        type: form.job_nature,
        resume_id: this.resumeUserInfo.id
      };

      this.submitLoading = true;
      this.globalService.post('/v1/web/user/resume/all_work/intent', option).subscribe((res:ApiData) => {
        this.submitLoading = false;
        this.msg.success(res.message);
        this.steps('next');
      }, err => this.submitLoading = false)
    }
    
  }

  steps(directive:string): void {
    this.stepsChange.emit(directive)
  }


  log(value: string[]): void {
    this.validateForm.patchValue({
      job_nature: value
    });
  }
}
