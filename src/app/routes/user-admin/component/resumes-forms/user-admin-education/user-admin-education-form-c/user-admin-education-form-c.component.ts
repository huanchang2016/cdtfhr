import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-admin-education-form-c',
  templateUrl: './user-admin-education-form-c.component.html',
  styleUrls: ['./user-admin-education-form-c.component.less']
})
export class UserAdminEducationFormCComponent implements OnChanges, OnInit {
  @Input() index:number;

  @Input() isSubmitCheck?:boolean = false;

  @Output() formValidChange:EventEmitter<any> = new EventEmitter();

  @Output() isNotValid?:EventEmitter<any> = new EventEmitter();

  eduOptions:any = null;

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if(this.isSubmitCheck) {
      this.submitForm().then( form => {
        console.log('res,...', form);
        if(!form.valid) {
          // 如果当前表单验证未通过，告诉上一级，不能提交信息
          this.isNotValid.emit(false);
        }
      })
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      school_name: [null, [Validators.required]],
      edu_record: [null, [Validators.required]],
      edu_major: [null, [Validators.required]],
      edu_start_time: [null, [Validators.required]],
      edu_end_time: [null, [Validators.required]],
      is_not_end: [false] // 根据 是否毕业 确定  毕业时间是否为必填项
    });

    this.validateForm.valueChanges.subscribe( _ => {
      this.formValidChange.emit({
        index: this.index,
        form: this.validateForm
      });
    })
  }

  isNotEndChange(required: boolean): void {
    if (required) {
      this.validateForm.get('edu_end_time')!.clearValidators();
      this.validateForm.get('edu_end_time')!.markAsPristine();
    } else {
      this.validateForm.get('edu_end_time')!.setValidators(Validators.required);
      this.validateForm.get('edu_end_time')!.markAsDirty();
    }
    this.validateForm.get('edu_end_time')!.updateValueAndValidity();
  }

  submitForm(): Promise<any> {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 个人信息');

    //  判断入学和毕业时间的相对大小
    console.log('判断入学和毕业时间的相对大小');
    
    return new Promise((resolve) => {
      resolve(this.validateForm);
    });
    
  }
}
