import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserDataService } from '../../../service/user-data.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResumeSectionDeletedModalComponent } from '../../resume-section-deleted-modal/resume-section-deleted-modal.component';
import { debounceTime } from 'rxjs/operators';
import { format } from 'date-fns';

@Component({
  selector: 'app-user-admin-work-andintension-form-c',
  templateUrl: './user-admin-work-andintension-form-c.component.html',
  styleUrls: ['./user-admin-work-andintension-form-c.component.less']
})
export class UserAdminWorkAndintensionFormCComponent implements OnInit {
  @Input() resumeUserInfo: any;
  @Output() valueChanges: EventEmitter<any> = new EventEmitter();
  @Output() resumeInfoChange: EventEmitter<any> = new EventEmitter();
  @Output() stepsChange: EventEmitter<any> = new EventEmitter();

  validateForm!: FormGroup;

  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    private userDataService: UserDataService,
    public globalService: GlobalSettingsService,
    private msg: NzMessageService
  ) { }

  log(value: string[]): void {
    this.validateForm.patchValue({
      job_nature: value
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      // 求职意向
      work_address: [null, [Validators.required, Validators.maxLength(3)]], // [2544, 2580, 2895]
      industry: [null, [Validators.required, Validators.maxLength(3)]],
      job_position: [null, [Validators.required, Validators.maxLength(3)]], // [646, 957, 959, 647]
      job_salary: [null, [Validators.required]],
      job_status: [null, [Validators.required]],
      job_nature: [null, [Validators.required]],


      is_work: [true, [Validators.required]],
      workExp: this.fb.array([
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
      ]),

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

    if (this.resumeUserInfo) {
      this.resetForm();
    }

    this.validateForm.valueChanges.pipe(debounceTime(300)).subscribe(_ => this.valueChanges.emit(true));

    this.validateForm.get('is_work').valueChanges.subscribe((is_exp: boolean) => {
      this.resetValidWorkExp('is_work');
    });

    this.validateForm.get('is_internship').valueChanges.subscribe((is_exp: boolean) => {
      this.resetValidInternshipExp('is_internship');
    });

  }

  job_nature: any[] = [];
  resetForm() {

    // 求职意向 赋值 target
    const target: any = this.resumeUserInfo.target;
    if (target && target.city.length !== 0) {
      const work_address = this.resumeUserInfo.target.city.map(v => v.id);
      const industry = this.resumeUserInfo.target.industry.map(v => v.id);
      const job_position = this.resumeUserInfo.target.job_type.map(v => v.id);
      this.job_nature = this.resumeUserInfo.target.type.map(v => v.id);
      this.validateForm.patchValue({
        work_address: work_address,
        industry: industry,
        job_position: job_position,
        job_salary: this.resumeUserInfo.target.salary ? this.resumeUserInfo.target.salary.id : null,
        job_status: this.resumeUserInfo.target.status ? this.resumeUserInfo.target.status.id : null,
        job_nature: this.job_nature
      });
    }
    // 工作经历赋值 workExp
    const workExp: any[] = this.validateForm.get('workExp').value;
    const workList: any[] = this.resumeUserInfo.work.data;
    if (this.resumeUserInfo.work_date) {
      if (workList && workList.length !== 0) {
        workList.forEach((el, index) => {
          if (index > 0 && workExp.length < workList.length) {
            // 表单组元素长度 小于 数据长度时新增
            this.add('workExp');
          }
        });
        this.validateForm.patchValue({
          workExp: workList.map(v => {
            return {
              company_name: v.name,
              company_industry: v.industry ? v.industry.id : null,
              company_scale: v.scale.id,
              company_nature: v.type.id,
              position_name: v.position,
              work_range_date: [v.start_time, v.end_time],
              range_salary: v.salary.id,
              work_description: v.description
            }
          })
        })
      }
    } else {
      this.validateForm.patchValue({
        is_work: false
      })
    }

    // 实习经历赋值 workExp
    const internshipExp: any[] = this.validateForm.get('internshipExp').value;
    const practiceList: any[] = this.resumeUserInfo.practice.data;
    if (practiceList && practiceList.length !== 0) {

      practiceList.forEach((el, index) => {
        if (index > 0 && internshipExp.length < practiceList.length) {
          // 表单组元素长度 小于 数据长度时新增
          this.add('internshipExp');
        }
      });
      this.validateForm.patchValue({
        internshipExp: practiceList.map(v => {
          return {
            company_name: v.name,
            company_industry: v.industry ? v.industry.id : null,
            company_scale: v.scale.id,
            company_nature: v.type.id,
            position_name: v.position,
            work_range_date: [v.start_time, v.end_time],
            range_salary: v.salary.id,
            work_description: v.description
          }
        })
      })
    } else {
      this.validateForm.patchValue({
        is_internship: false
      })
    }

  }

  // 获取表单中 formArray 的所有项
  get workExpArrayControls() {
    const group = this.validateForm.get('workExp') as FormArray;
    return group.controls;
  }
  get internshipExpArrayControls() {
    const group = this.validateForm.get('internshipExp') as FormArray;
    return group.controls;
  }

  add(type: string) {
    const groupArray: FormArray = this.validateForm.get(type) as FormArray;
    if (type === 'workExp') {
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

  deleted(index: number, type: string): void {
    const groupArray: FormArray = this.validateForm.get(type) as FormArray;

    groupArray.removeAt(index);
  }

  cancel() { }


  /****
   *  根据是否有项目经历 \ 培训经历 / 证书  其它语言能力
   *    重置（初始化）formArray -> formGroup 中的每个元素的验证规则
   * ****/
  resetValidWorkExp(type: string): void {
    const is_exp: boolean = this.validateForm.get(type).value;
    for (let i = 0; i < this.workExpArrayControls.length; i++) {
      const element: any = this.workExpArrayControls[i];
      for (const i in element.controls) {
        if (is_exp) {
          element.controls[i]!.setValidators(Validators.required);
          // element.controls[i]!.markAsDirty();
        } else {
          element.controls[i]!.clearValidators();
          element.controls[i]!.markAsPristine();
        }
        element.controls[i].updateValueAndValidity();
      }
    }
  }

  resetValidInternshipExp(type: string): void {
    const is_exp: boolean = this.validateForm.get(type).value;
    for (let i = 0; i < this.internshipExpArrayControls.length; i++) {
      const element: any = this.internshipExpArrayControls[i];
      for (const i in element.controls) {
        if (is_exp) {
          element.controls[i]!.setValidators(Validators.required);
        } else {
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

  submitLoading = false;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    // 验证 formArray -> formGroup -> formControl 元素  工作经验为必填项
    if (this.validateForm.get('is_work').value) {
      for (let i = 0; i < this.workExpArrayControls.length; i++) {
        const element: any = this.workExpArrayControls[i];
        for (const i in element.controls) {
          element.controls[i].markAsDirty();
          element.controls[i].updateValueAndValidity();
        }
      }
    }
    if (this.validateForm.get('is_internship').value) {
      for (let i = 0; i < this.internshipExpArrayControls.length; i++) {
        const element: any = this.internshipExpArrayControls[i];
        for (const i in element.controls) {
          element.controls[i].markAsDirty();
          element.controls[i].updateValueAndValidity();
        }
      }
    }



    if (this.validateForm.valid) {
      let option: any = {};

      if (this.validateForm.get('is_work').value) {
        const workExp: any[] = this.validateForm.get('workExp').value;

        const work: any[] = workExp.map(v => {
          const start_date = format(new Date(v.work_range_date[0]), 'yyyy-MM-dd');
          const end_date = format(new Date(v.work_range_date[1]), 'yyyy-MM-dd');
          return {
            name: v.company_name,
            industry_id: v.company_industry,
            company_scale_id: v.company_scale,
            company_type_id: v.company_nature,
            position_name: v.position_name,
            start_time: start_date,
            end_time: end_date,
            salary: v.range_salary,
            description: v.work_description
          }
        });
        option = Object.assign(option, { work });
      }

      if (this.validateForm.get('is_internship').value) {
        const internshipExp: any[] = this.validateForm.get('internshipExp').value;

        const practice: any[] = internshipExp.map(v => {
          const start_time = format(new Date(v.work_range_date[0]), 'yyyy-MM-dd');
          const end_time = format(new Date(v.work_range_date[1]), 'yyyy-MM-dd');
          return {
            name: v.company_name,
            industry_id: v.company_industry,
            company_scale_id: v.company_scale,
            company_type_id: v.company_nature,
            position_name: v.position_name,
            start_time: start_time,
            end_time: end_time,
            salary: v.range_salary,
            description: v.work_description
          }
        });
        option = Object.assign(option, { practice });

      }
      const form: any = this.validateForm.value;
      const intent = { // 求职意向
        city: form.work_address,
        industry: form.industry,
        job_type: form.job_position,
        target_salary_id: form.job_salary,
        status: form.job_status,
        type: form.job_nature
      };
      option = Object.assign(option, { intent });

      option = Object.assign(option, {
        resume_id: this.resumeUserInfo.id
      });


      this.submitLoading = true;

      this.globalService.post('/v1/web/user/resume/work_intent', option).subscribe((res: ApiData) => {
        this.submitLoading = false;
        if (res.code === 200) {
          this.msg.success('保存成功');
          this.resumeInfoChange.emit(res.data);
          this.userDataService.getProfile().then();
          this.steps('next');
        } else {
          this.msg.error(res.message);
        }
      }, err => this.submitLoading = false)
    }
  }


  get getSelfCommentLength(): number {
    if (this.validateForm.get('self_comment').value) {
      return this.validateForm.get('self_comment').value.length;
    }
    return 0;
  }

  get getSelfInterestLength(): number {
    if (this.validateForm.get('self_interest').value) {
      return this.validateForm.get('self_interest').value.length;
    }
    return 0;
  }

  deletedModal(index: number, type: string): void {
    const modal = this.modal.create({
      nzTitle: '提示',
      nzContent: ResumeSectionDeletedModalComponent,
      nzWidth: '400px',
      nzBodyStyle: {
        padding: '24px'
      },
      nzMaskClosable: false,
      nzComponentParams: {

      },
      nzFooter: null
    });
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      if (result === true) {
        this.deleted(index, type);
      }
    });
  }
}
