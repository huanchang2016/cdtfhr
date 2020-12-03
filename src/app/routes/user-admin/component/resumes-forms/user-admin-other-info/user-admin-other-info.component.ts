import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { UserDataService } from '../../../service/user-data.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ResumeSectionDeletedModalComponent } from '../../resume-section-deleted-modal/resume-section-deleted-modal.component';
import { UserResumesCreateSuccessTplComponent } from '../user-resumes-create-success-tpl/user-resumes-create-success-tpl.component';
import { debounceTime } from 'rxjs/operators';
import { format } from 'date-fns';

@Component({
  selector: 'app-user-admin-other-info',
  templateUrl: './user-admin-other-info.component.html',
  styleUrls: ['./user-admin-other-info.component.less']
})
export class UserAdminOtherInfoComponent implements OnInit {
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
    private msg: NzMessageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      is_projectExp: [true, [Validators.required]],
      projectExp: this.fb.array([
        this.fb.group({
          projectName: [null, [Validators.required]],
          projectRangeDate: [null, [Validators.required]],
          projectDescription: [null, [Validators.required]]
        })
      ]),
      is_trainExp: [true, [Validators.required]],
      trainExp: this.fb.array([
        this.fb.group({
          trainContent: [null, [Validators.required]],
          trainOrganization: [null],
          trainRangeDate: [null, [Validators.required]]
        })
      ]),
      is_certificate: [true, [Validators.required]],
      certificates: this.fb.array([
        this.fb.group({
          certificateName: [null, [Validators.required]],
          certificateDate: [null, [Validators.required]]
        })
      ]),
      is_language: [true, [Validators.required]],
      languages: this.fb.array([
        this.fb.group({
          languageType: [null, [Validators.required]],
          languageWrite: [null, [Validators.required]],
          languageListen: [null, [Validators.required]]
        })
      ]),

      self_comment: [null, Validators.maxLength(300)],
      self_interest: [null, Validators.maxLength(300)]
    });

    this.validateForm.valueChanges.pipe(debounceTime(300)).subscribe(_ => this.valueChanges.emit(true));

    this.validateForm.get('is_projectExp').valueChanges.subscribe((is_exp: boolean) => {
      this.resetValidProjectExp('is_projectExp');
    });
    this.validateForm.get('is_trainExp').valueChanges.subscribe((is_exp: boolean) => {
      this.resetValidTrainExp('is_trainExp');
    });
    this.validateForm.get('is_certificate').valueChanges.subscribe((is_exp: boolean) => {
      this.resetValidCertificateExp('is_certificate');
    });
    this.validateForm.get('is_language').valueChanges.subscribe((is_exp: boolean) => {
      this.resetValidLanguageExp('is_language');
    });

    if (this.resumeUserInfo) {
      this.resetForm();
    }
  }

  resetForm() {

    const projectExp: any[] = this.validateForm.get('projectExp').value;
    const projectList: any[] = this.resumeUserInfo.project.data;
    if (projectList && projectList.length !== 0) {

      projectList.forEach((el, index) => {
        if (index > 0 && projectExp.length < projectList.length) {
          this.add('projectExp');
        }
      });
      this.validateForm.patchValue({
        projectExp: projectList.map(v => {
          return {
            projectName: v.name,
            projectRangeDate: [v.start_time, v.end_time],
            projectDescription: v.description
          }
        })
      })
    } else {
    }
    const trainExp: any[] = this.validateForm.get('trainExp').value;
    const trainList: any[] = this.resumeUserInfo.training.data;
    if (trainList && trainList.length !== 0) {
      trainList.forEach((el, index) => {
        if (index > 0 && trainExp.length < trainList.length) {
          this.add('trainExp');
        }
      });
      this.validateForm.patchValue({
        trainExp: trainList.map(v => {
          return {
            trainContent: v.description,
            trainOrganization: v.name,
            trainRangeDate: [v.start_time, v.end_time]
          }
        })
      })
    } else {
    }
    const certificates: any[] = this.validateForm.get('certificates').value;
    const certificateList: any[] = this.resumeUserInfo.certificate.data;
    if (certificateList && certificateList.length !== 0) {
      certificateList.forEach((el, index) => {
        if (index > 0 && certificates.length < certificateList.length) {
          this.add('certificates');
        }
      });
      this.validateForm.patchValue({
        certificates: certificateList.map(v => {
          return {
            certificateName: v.name,
            certificateDate: v.time
          }
        })
      })
    } else {
    }
    const languages: any[] = this.validateForm.get('languages').value;
    const languageList: any[] = this.resumeUserInfo.language.data;
    if (languageList && languageList.length !== 0) {
      languageList.forEach((el, index) => {
        if (index > 0 && languages.length < languageList.length) {
          this.add('languages');
        }
      });
      this.validateForm.patchValue({
        languages: languageList.map(v => {
          return {
            languageType: v.language.id,
            languageWrite: v.reading_writing,
            languageListen: v.listening_speaking
          }
        })
      })
    } else {
    }

  }

  get projectExpArrayControls() {
    const group = this.validateForm.get('projectExp') as FormArray;
    return group.controls;
  }

  get trainExpArrayControls() {
    const group = this.validateForm.get('trainExp') as FormArray;
    return group.controls;
  }

  get certificatesArrayControls() {
    const group = this.validateForm.get('certificates') as FormArray;
    return group.controls;
  }

  get languagesArrayControls() {
    const group = this.validateForm.get('languages') as FormArray;
    return group.controls;
  }

  add(type: string) {
    const groupArray: FormArray = this.validateForm.get(type) as FormArray;
    if (type === 'projectExp') {
      groupArray.push(
        this.fb.group({
          projectName: [null, [Validators.required]],
          projectRangeDate: [null, [Validators.required]],
          projectDescription: [null, [Validators.required]]
        })
      )
    }
    if (type === 'trainExp') {
      groupArray.push(
        this.fb.group({
          trainOrganization: [null],
          trainRangeDate: [null, [Validators.required]],
          trainContent: [null, [Validators.required]]
        })
      )
    }
    if (type === 'certificates') {
      groupArray.push(
        this.fb.group({
          certificateName: [null, [Validators.required]],
          certificateDate: [null, [Validators.required]]
        })
      )
    }
    if (type === 'languages') {
      groupArray.push(
        this.fb.group({
          languageType: [null, [Validators.required]],
          languageWrite: [null, [Validators.required]],
          languageListen: [null, [Validators.required]]
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
  resetValidProjectExp(type: string): void {
    const is_exp: boolean = this.validateForm.get(type).value;
    for (let i = 0; i < this.projectExpArrayControls.length; i++) {
      const element: any = this.projectExpArrayControls[i];
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
  resetValidTrainExp(type: string): void {
    const is_exp: boolean = this.validateForm.get(type).value;
    for (let i = 0; i < this.trainExpArrayControls.length; i++) {
      const element: any = this.trainExpArrayControls[i];
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
  resetValidCertificateExp(type: string): void {
    const is_exp: boolean = this.validateForm.get(type).value;
    for (let i = 0; i < this.certificatesArrayControls.length; i++) {
      const element: any = this.certificatesArrayControls[i];
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
  resetValidLanguageExp(type: string): void {
    const is_exp: boolean = this.validateForm.get(type).value;
    for (let i = 0; i < this.languagesArrayControls.length; i++) {
      const element: any = this.languagesArrayControls[i];
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
    if (this.validateForm.get('is_projectExp').value) {
      for (let i = 0; i < this.projectExpArrayControls.length; i++) {
        const element: any = this.projectExpArrayControls[i];
        for (const i in element.controls) {
          element.controls[i].markAsDirty();
          element.controls[i].updateValueAndValidity();
        }
      }
    }
    if (this.validateForm.get('is_trainExp').value) {
      for (let i = 0; i < this.projectExpArrayControls.length; i++) {
        const element: any = this.projectExpArrayControls[i];
        for (const i in element.controls) {
          element.controls[i].markAsDirty();
          element.controls[i].updateValueAndValidity();
        }
      }
    }
    if (this.validateForm.get('is_certificate').value) {
      for (let i = 0; i < this.projectExpArrayControls.length; i++) {
        const element: any = this.projectExpArrayControls[i];
        for (const i in element.controls) {
          element.controls[i].markAsDirty();
          element.controls[i].updateValueAndValidity();
        }
      }
    }
    if (this.validateForm.get('is_language').value) {
      for (let i = 0; i < this.projectExpArrayControls.length; i++) {
        const element: any = this.projectExpArrayControls[i];
        for (const i in element.controls) {
          element.controls[i].markAsDirty();
          element.controls[i].updateValueAndValidity();
        }
      }
    }


    if (this.validateForm.valid) {
      let option: any = {};

      if (this.validateForm.get('is_projectExp').value) {
        const projectExp: any[] = this.validateForm.get('projectExp').value;
        const project: any[] = projectExp.map(v => {
          const start_time = format(new Date(v.projectRangeDate[0]), 'yyyy-MM-dd');
          const end_time = format(new Date(v.projectRangeDate[1]), 'yyyy-MM-dd');
          return {
            name: v.projectName,
            start_time: start_time,
            end_time: end_time,
            description: v.projectDescription
          }
        });
        option = Object.assign(option, { project });
      }
      if (this.validateForm.get('is_trainExp').value) {
        const trainExp: any[] = this.validateForm.get('trainExp').value;
        const training: any[] = trainExp.map(v => {
          const start_time = format(new Date(v.trainRangeDate[0]), 'yyyy-MM-dd');
          const end_time = format(new Date(v.trainRangeDate[1]), 'yyyy-MM-dd');
          return {
            name: v.trainOrganization,
            start_time: start_time,
            end_time: end_time,
            description: v.trainContent
          }
        });
        option = Object.assign(option, { training });
      }
      if (this.validateForm.get('is_certificate').value) {
        const certificates: any[] = this.validateForm.get('certificates').value;
        const certificate: any[] = certificates.map(v => {
          const time = format(new Date(v.certificateDate), 'yyyy-MM-dd');
          return {
            name: v.certificateName,
            time: time
          }
        });
        option = Object.assign(option, { certificate });
      }
      if (this.validateForm.get('is_language').value) {
        const languages: any[] = this.validateForm.get('languages').value;
        const language: any[] = languages.map(v => {
          return {
            language_id: v.languageType,
            reading_writing: v.languageWrite,
            listening_speaking: v.languageListen
          }
        });
        option = Object.assign(option, { language });
      }

      option = Object.assign(option, {
        resume_id: this.resumeUserInfo.id,
        self_evalution: this.validateForm.get('self_comment').value,
        hobby: this.validateForm.get('self_interest').value
      });

      this.submitLoading = true;
      this.globalService.post('/v1/web/user/resume/other', option).subscribe((res: ApiData) => {
        this.submitLoading = false;
        if (res.code === 200) {
          this.userDataService.getProfile().then();
          this.valueChanges.emit(false);
          this.referSuccessModal();
        } else {
          this.msg.error(res.message);
        }

      }, err => this.submitLoading = false)

    }

  }

  successModal: NzModalRef = null;
  referSuccessModal(): void {
    this.successModal = this.modal.create({
      nzTitle: null,
      nzContent: UserResumesCreateSuccessTplComponent,
      nzMaskClosable: false,
      nzWidth: 455,
      nzStyle: { top: '250px' },

      nzFooter: null
    });

    setTimeout(() => {
      this.successModal.close();
      this.route.navigateByUrl(`/admin/user/resumes/edit/${this.resumeUserInfo.id}`);
    }, 2000);
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
    modal.afterClose.subscribe(result => {
      if (result === true) {
        this.deleted(index, type);
      }
    });
  }
}
