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
  selector: 'app-user-admin-education',
  templateUrl: './user-admin-education.component.html',
  styleUrls: ['./user-admin-education.component.less']
})
export class UserAdminEducationComponent implements OnInit {
  @Input() resumeUserInfo: any;

  @Output() valueChanges: EventEmitter<any> = new EventEmitter();
  @Output() stepsChange: EventEmitter<any> = new EventEmitter();
  @Output() resumeInfoChange: EventEmitter<any> = new EventEmitter();

  validateForm!: FormGroup;

  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    public globalService: GlobalSettingsService,
    private msg: NzMessageService,
    private userDataService: UserDataService
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
        })
      ])
    });

    this.validateForm.valueChanges.pipe(debounceTime(300)).subscribe(_ => this.valueChanges.emit(true));

    if (this.resumeUserInfo && this.resumeUserInfo.education) {
      const data: any[] = this.resumeUserInfo.education.data;
      if (data && data.length !== 0) {
        this.resetForm(data);
      }
    }
  }
  resetForm(list: any[]) {
    const eduArr: any[] = this.validateForm.get('eduExp').value;
    list.forEach((el, index) => {
      if (index > 0 && eduArr.length < list.length) {
        this.add('eduExp');
      }
    });
    this.validateForm.patchValue({
      eduExp: list.map((v, index) => {
        this.isNotEndChange(!v.end_time, index);
        return {
          school_name: v.name,
          edu_record: v.education.id,
          edu_major: v.major,
          edu_start_time: v.start_time,
          edu_end_time: v.end_time,
          is_not_end: !v.end_time ? true : false
        }
      })
    })
  }


  isNotEndChange(required: boolean, i: number): void {
    if (required) {
      this.eduExpArrayControls[i].get('edu_end_time')!.clearValidators();
      this.eduExpArrayControls[i].get('edu_end_time')!.markAsPristine();
    } else {
      this.eduExpArrayControls[i].get('edu_end_time')!.setValidators(Validators.required);
      this.eduExpArrayControls[i].get('edu_end_time')!.markAsDirty();
    }
    this.eduExpArrayControls[i].get('edu_end_time')!.updateValueAndValidity();
  }

  get eduExpArrayControls() {
    const group = this.validateForm.get('eduExp') as FormArray;
    return group.controls;
  }


  add(type: string) {
    const groupArray: FormArray = this.validateForm.get(type) as FormArray;
    if (type === 'eduExp') {
      groupArray.push(
        this.fb.group({
          school_name: [null, [Validators.required]],
          edu_record: [null, [Validators.required]],
          edu_major: [null, [Validators.required]],
          edu_start_time: [null, [Validators.required]],
          edu_end_time: [null, [Validators.required]],
        })
      )
    }
  }

  deleted(index: number, type: string): void {
    const groupArray: FormArray = this.validateForm.get(type) as FormArray;
    groupArray.removeAt(index);
  }

  cancel() { }

  steps(type: string) {
    this.stepsChange.emit(type);
  }
  submitLoading: boolean = false;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    for (let i = 0; i < this.eduExpArrayControls.length; i++) {
      const element: any = this.eduExpArrayControls[i];
      for (const i in element.controls) {
        element.controls[i].markAsDirty();
        element.controls[i].updateValueAndValidity();
      }
    }


    if (this.validateForm.valid) {
      const eduExp: any[] = this.validateForm.get('eduExp').value;

      const edu: any[] = eduExp.map(v => {
        const start_time = format(new Date(v.edu_start_time), 'yyyy-MM-dd');
        const end_time = v.is_not_end ? '' : format(new Date(v.edu_end_time), 'yyyy-MM-dd');
        return {
          name: v.school_name,
          major: v.edu_major,
          education_id: v.edu_record,
          start_time: start_time,
          end_time: end_time
        }
      });

      const option = Object.assign({ edu }, { resume_id: this.resumeUserInfo.id });

      this.submitLoading = true;
      this.globalService.post('/v1/web/user/resume/edu', option).subscribe((res: ApiData) => {
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
    modal.afterClose.subscribe(result => {
      if (result === true) {
        this.deleted(index, type);
      }
    });
  }
}
