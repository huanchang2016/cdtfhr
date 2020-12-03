import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-score-query-result',
  templateUrl: './score-query-result.component.html',
  styleUrls: ['./score-query-result.component.less']
})
export class ScoreQueryResultComponent implements OnInit {
  exam_id: number;
  examInfo: any;

  validateForm!: FormGroup;

  loading: boolean = false;
  result: any = null;

  captchaLoading: boolean = false;
  imgSrc: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params) {
        this.exam_id = +params['id'];
        this.getExamInfo();
      }
    })
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      id_card: [null, [Validators.required]],
      captcha: [null, [Validators.required]]
    });

    this.changeCaptcha();
  }

  getExamInfo(): void {
    this.settingService.post(`/v1/web/exam/exams/${this.exam_id}`).subscribe((res: ApiData) => {
      this.loading = false;
      if (res.code === 200) {
        this.examInfo = res.data;
      }
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      const value = this.validateForm.value;
      const opt = {
        id_number: value.id_card,
        name: value.username,
        captcha: value.captcha,
        code_id: this.code_id
      };
      this.search(opt);
    }
  }

  isEmpty: boolean = false;
  search(opt): void {
    this.loading = true;
    this.result = null;
    this.isEmpty = false;
    this.settingService.post(`/v1/web/exam/exam_score/${this.exam_id}`, opt).subscribe((res: ApiData) => {
      this.loading = false;
      if (res.code === 200) {
        this.result = res.data;
        if (!this.result) {
          this.isEmpty = true;
        }
      } else {
        this.msg.error(res.message);
      }
      this.changeCaptcha();
    },
      err => {
        this.loading = false;
        this.changeCaptcha();
      }
    );
  }

  code_id: string = '';

  @ViewChild('captchaInput', { static: false }) captchaInput: ElementRef;

  changeCaptcha(): void {
    this.captchaLoading = true;
    this.imgSrc = '';
    this.code_id = '';
    // 验证码 重新获取时需要将验证码表单项置空 表单获取焦点
    this.validateForm.patchValue({
      captcha: ''
    });
    if (this.captchaInput) {
      this.captchaInput.nativeElement.focus();
    }

    this.settingService.get(`/v1/web/exam/get_captcha`).subscribe((res: ApiData) => {
      this.captchaLoading = false;
      if (res.code === 200) {
        this.imgSrc = res.data.img;
        this.code_id = res.data.code_id;
      }
    },
      err => this.captchaLoading = false
    );
  }

}
