import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { InterviewMessageViewTplComponent } from '../interview-message-view-tpl/interview-message-view-tpl.component';
import { environment } from '@env/environment';
import { differenceInYears } from 'date-fns';
import addDays from 'date-fns/addDays';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { format } from 'date-fns';


@Component({
  selector: 'app-interview-message-send-tpl',
  templateUrl: './interview-message-send-tpl.component.html',
  styleUrls: ['./interview-message-send-tpl.component.less']
})
export class InterviewMessageSendTplComponent implements OnInit {
  @Input() resumeInfo: any;
  @Input() positionInfo: any;
  environment = environment;
  validateForm: FormGroup;

  submitLoading: boolean = false;

  constructor(
    // private viewContainerRef: ViewContainerRef,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private modalSrv: NzModalService,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
  ) {
    this.validateForm = this.fb.group({
      address: [null, [Validators.required]],
      time: [null, [Validators.required]],
      content: [null, [Validators.required]],
      is_email: [null],
      is_phone: [null]
    });
  }

  ngOnInit():void {
    // const placeholderContent:string = `${this.resumeInfo.name}，您好！您已通过${} - ${this.positionInfo ? this.positionInfo.name : 'xxxx职位' }的简历初筛，进入面试环节。请您合理安排时间准时参加面试,如有疑问，请联系HR电话：xxx-xxxxxxxx。`;
    // this.validateForm.patchValue({
    //   content: placeholderContent
    // });

  }

  errorMsg:string = '';

  typeChange():void {
    if(!this.validateForm.value.is_email && !this.validateForm.value.is_phone) {
      this.errorMsg = '请选择面试通知方式';
      return;
    }else {
      this.errorMsg = '';
    }
  }
  submitForm(): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(this.validateForm, '......发送通知');

    if(!this.validateForm.value.is_email && !this.validateForm.value.is_phone) {
      this.errorMsg = '请选择面试通知方式';
      return;
    }else {
      this.errorMsg = '';
    }


    if(this.validateForm.valid) {
      const value:any = this.validateForm.value;
      
      /****
       * 通知面试方式
       * 1. 邮件
       * 2. 短信
       * 3. 邮件 和  短信
       ******/
      const type: 1 | 2 | 3 = (value.is_email && value.is_phone) ? 3 : (value.is_email ? 1 : 2);

      const option:any = {
        resume_id: this.resumeInfo.id,
        job_id: this.positionInfo.id,
        site: value.address,
        time: format(value.time, 'yyyy-MM-dd HH:mm:ss'),
        content: value.content,
        type: type
        // email: value.is_email ? this.resumeInfo.email : null,
        // phone: value.is_phone ? this.resumeInfo.phone : null
      };

      console.log('option, 面试邀请信息', option);
      this.submitLoading = true;
      this.settingService.post('/v1/web/com/resume/invite_interview', option).subscribe((res:ApiData) => {
        console.log(res, '面试通知');
        this.submitLoading = false;
        if(res.code === 200) {
          this.msg.success(res.message);
          this.destroyModal({ type: 'success' });
        }else {
          this.msg.error(res.message);
        }
      }, err => this.submitLoading = false)
    }
  }

  handleCancel(): void {
    this.submitLoading = false;
    this.destroyModal();
  }


  view(): void { // 保存
    console.log('预览通知信息, 表单填写验证通过可以预览', this.validateForm);
    if (!this.validateForm.valid) {
      this.msg.error('通知信息填写不完整，不能预览');
      return;
    }
    // const interview_time = format(this.validateForm.value.time, 'yyyy/MM/dd HH:mm:ss');
    // const interview_addr = this.validateForm.value.address.trim();
    const modal = this.modalSrv.create({
      nzTitle: '',
      nzContent: InterviewMessageViewTplComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzWrapClassName: 'view_modal',
      nzWidth: '360px',
      nzBodyStyle: {
        padding: '0',
        background: "url('/assets/imgs/icon/img_messagebg.png') no-repeat left top",
        backgroundSize: '100% 100%',
        borderRadius: '20px'
      },
      nzMaskClosable: false,
      nzComponentParams: {
        // data: `${this.resumeInfo.name}，您好。天府菁英网提醒您，
        // 您已通过${'公司名称'} - ${this.positionInfo ? this.positionInfo.name : 'xxxx职位' }的简历初
        // 筛，进入面试环节。面试时间 ${interview_time}
        // ，面试地址 ${interview_addr}，请您合理安排时
        // 间准时参加面试，如有疑问，请联系HR电话${this.positionInfo ? this.positionInfo.tel : '028-80518071-599'}。`
        data: this.validateForm.value.content
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    // modal.afterClose.subscribe(result => console.log('[afterClose 转发modal] The result is:', result));

  }

  destroyModal(data?: any): void {
    this.modal.destroy(data);
  }

  countYears(t: string): string {
    let work_date: string = '';
    if (t) {
      const today: Date = new Date();
      const year = differenceInYears(today, new Date(t));
      work_date = year > 1 ? `${year}年工作经验` : '工作经验不足一年';
    } else {
      work_date = '暂无工作经验'
    }
    return work_date;
  }
  
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    const tomorrow = addDays(new Date(), 1);
    return differenceInCalendarDays(current, tomorrow) < 0;
  };

}
