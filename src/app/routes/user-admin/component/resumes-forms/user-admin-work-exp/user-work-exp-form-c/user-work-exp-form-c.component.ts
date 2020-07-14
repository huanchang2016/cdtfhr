import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-work-exp-form-c',
  templateUrl: './user-work-exp-form-c.component.html',
  styleUrls: ['./user-work-exp-form-c.component.less']
})
export class UserWorkExpFormCComponent implements OnChanges, OnInit {
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
      company_name: [null, [Validators.required]],
      company_industry: [null, [Validators.required]],
      company_scale: [null, [Validators.required]],
      company_nature: [null, [Validators.required]],
      position_name: [null, [Validators.required]],
      work_range_date: [null, [Validators.required]],
      range_salary: [null, [Validators.required]],
      work_description: [null, [Validators.required]]
    });

    this.validateForm.valueChanges.subscribe( _ => {
      console.log(this.validateForm);
      this.formValidChange.emit({
        index: this.index,
        form: this.validateForm
      });
    })
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