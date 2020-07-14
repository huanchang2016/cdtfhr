import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-admin-job-intension-form-c',
  templateUrl: './user-admin-job-intension-form-c.component.html',
  styleUrls: ['./user-admin-job-intension-form-c.component.less']
})
export class UserAdminJobIntensionFormCComponent implements OnInit {
  @Output()stepsChange:EventEmitter<any> = new EventEmitter();
  
  validateForm!: FormGroup;

  checkOptionsOne = [
    { label: '全职', value: 1 },
    { label: '兼职', value: 2 },
    { label: '实习', value: 3 }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      work_address: [null, [Validators.required]],
      industry: [null, [Validators.required]],
      job_position: [null, [Validators.required]],
      job_salary: [null, [Validators.required]],
      job_status: [null, [Validators.required]],
      job_nature: [null, [Validators.required]]
    });

  }
  
  submitForm(): Promise<any> {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 求职意向');
    return new Promise((resolve) => {
      resolve(this.validateForm);
    });
    
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
