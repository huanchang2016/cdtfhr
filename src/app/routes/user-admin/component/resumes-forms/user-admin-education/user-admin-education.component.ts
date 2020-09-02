import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-admin-education',
  templateUrl: './user-admin-education.component.html',
  styleUrls: ['./user-admin-education.component.less']
})
export class UserAdminEducationComponent implements OnInit {
  @Input() resumeUserInfo:any;

  @Output() stepsChange:EventEmitter<any> = new EventEmitter();

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public globalService: GlobalSettingsService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      eduExp: this.fb.array([
        this.fb.group({
          school_name: [null, [Validators.required]],
          edu_record: [null, [Validators.required]],
          edu_major: [null, [Validators.required]],
          edu_start_time: [null, [Validators.required]],
          edu_end_time: [null, [Validators.required]],
          is_not_end: [false] // 根据 是否毕业 确定  毕业时间是否为必填项
        })
      ])
    });

  }
  

  isNotEndChange(required: boolean, i:number): void {
    if (required) {
      this.eduExpArrayControls[i].get('edu_end_time')!.clearValidators();
      this.eduExpArrayControls[i].get('edu_end_time')!.markAsPristine();
    } else {
      this.eduExpArrayControls[i].get('edu_end_time')!.setValidators(Validators.required);
      this.eduExpArrayControls[i].get('edu_end_time')!.markAsDirty();
    }
    this.eduExpArrayControls[i].get('edu_end_time')!.updateValueAndValidity();
  }

  // 获取表单中 formArray 的所有项
  get eduExpArrayControls() {
    const group = this.validateForm.get('eduExp') as FormArray;
    return group.controls;
  }


  add(type:string) {
    const groupArray:FormArray = this.validateForm.get(type) as FormArray;
    if (type === 'eduExp') {
      groupArray.push(
        this.fb.group({
          school_name: [null, [Validators.required]],
          edu_record: [null, [Validators.required]],
          edu_major: [null, [Validators.required]],
          edu_start_time: [null, [Validators.required]],
          edu_end_time: [null, [Validators.required]],
          is_not_end: [false] // 根据 是否毕业 确定  毕业时间是否为必填项
        })
      )
    }
  }

  deleted(index: number, type:string): void {
    const groupArray:FormArray = this.validateForm.get(type) as FormArray;

    groupArray.removeAt(index);
  }

  cancel() {}
  
  steps(type: string) {
    this.stepsChange.emit(type);
  }
  submitLoading: boolean = false;
  submitForm():void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log('edu controls', this.eduExpArrayControls);
    // 验证 formArray -> formGroup -> formControl 元素
    for (let i = 0; i < this.eduExpArrayControls.length; i++) {
      const element:any = this.eduExpArrayControls[i];
      for (const i in element.controls) {
        element.controls[i].markAsDirty();
        element.controls[i].updateValueAndValidity();
      }
    }

    
    console.log(this.validateForm, '简历 教育经历');
    if(this.validateForm.valid) {
      const eduExp:any[] = this.validateForm.get('eduExp').value;

      const edu:any[] = eduExp.map( v => {
        return {
          name: v.school_name,
          major: v.edu_major,
          education_id: v.edu_record,
          start_time: v.edu_start_time,
          end_time: v.is_not_end ? '至今' : v.edu_end_time
        }
      });
      const option = Object.assign({edu}, { resume_id: this.resumeUserInfo.id });

      this.submitLoading = true;
      this.globalService.post('/v1/web/user/resume/edu', option).subscribe((res:ApiData) => {
        this.submitLoading = false;
        this.msg.success(res.message);
        this.steps('next');
      }, err => this.submitLoading = false)
      
    }
    
  }

}
