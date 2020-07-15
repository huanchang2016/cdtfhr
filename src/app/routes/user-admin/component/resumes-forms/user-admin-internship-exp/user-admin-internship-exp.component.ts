import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-user-admin-internship-exp',
  templateUrl: './user-admin-internship-exp.component.html',
  styleUrls: ['./user-admin-internship-exp.component.less']
})
export class UserAdminInternshipExpComponent implements OnInit {
  @Output() stepsChange:EventEmitter<any> = new EventEmitter();

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      is_internship: [true, [Validators.required]],
      internshipExp: this.fb.array([
        this.fb.group({
          company_name: [null, [Validators.required]],
          company_industry: [null, [Validators.required]],
          company_scale: [null, [Validators.required]],
          company_nature: [null, [Validators.required]],
          position_name: [null, [Validators.required]],
          work_range_date: [null, [Validators.required]],
          range_salary: [null, [Validators.required]],
          work_description: [null, [Validators.required]]
        })
      ])
    });

    this.validateForm.get('is_internship').valueChanges.subscribe( (is_exp:boolean) => {
      this.resetValidInternshipExp('is_internship');
    });
  }

  // 获取表单中 formArray 的所有项
  get internshipExpArrayControls() {
    const group = this.validateForm.get('internshipExp') as FormArray;
    return group.controls;
  }


  add(type:string) {
    const groupArray:FormArray = this.validateForm.get(type) as FormArray;
    if (type === 'internshipExp') {
      groupArray.push(
        this.fb.group({
          company_name: [null, [Validators.required]],
          company_industry: [null, [Validators.required]],
          company_scale: [null, [Validators.required]],
          company_nature: [null, [Validators.required]],
          position_name: [null, [Validators.required]],
          work_range_date: [null, [Validators.required]],
          range_salary: [null, [Validators.required]],
          work_description: [null, [Validators.required]]
        })
      )
    }

  }

  deleted(index: number, type:string): void {
    const groupArray:FormArray = this.validateForm.get(type) as FormArray;

    groupArray.removeAt(index);
  }

  cancel() {}

  
  /****
   *  根据是否有项目经历 \ 培训经历 / 证书  其它语言能力
   *    重置（初始化）formArray -> formGroup 中的每个元素的验证规则
   * ****/
  resetValidInternshipExp(type:string):void {
    const is_exp:boolean = this.validateForm.get(type).value;
    for (let i = 0; i < this.internshipExpArrayControls.length; i++) {
      const element:any = this.internshipExpArrayControls[i];
      for (const i in element.controls) {
        if(is_exp) {
          element.controls[i]!.setValidators(Validators.required);
          element.controls[i]!.markAsDirty();
        }else {
          element.controls[i]!.clearValidators();
          element.controls[i]!.markAsPristine();
        }
        element.controls[i].updateValueAndValidity();
      }
    }
  }

  
  steps(type: string) {
    this.stepsChange.emit(type);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log('is_internship controls', this.internshipExpArrayControls);
    // 验证 formArray -> formGroup -> formControl 元素
    if(this.validateForm.get('is_internship').value) {
      for (let i = 0; i < this.internshipExpArrayControls.length; i++) {
        const element:any = this.internshipExpArrayControls[i];
        for (const i in element.controls) {
          element.controls[i].markAsDirty();
          element.controls[i].updateValueAndValidity();
        }
      }
    }

    
    console.log(this.validateForm, '简历 实习经历');
    if(this.validateForm.valid) {
      this.steps('next');
    }
  }

}
