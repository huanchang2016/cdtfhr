import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-resume-leave-component-modal',
  templateUrl: './resume-leave-component-modal.component.html',
  styleUrls: ['./resume-leave-component-modal.component.less']
})
export class ResumeLeaveComponentModalComponent implements OnInit {
  @Input() message?:string = '当前简历已存为草稿。';

  constructor(
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
  }

  handleOk(): void {
    this.modal.destroy(true);
  }
  handleCancel(): void {
    this.modal.destroy(false);
  }
}
