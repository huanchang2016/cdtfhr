import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-resume-section-deleted-modal',
  templateUrl: './resume-section-deleted-modal.component.html',
  styleUrls: ['./resume-section-deleted-modal.component.less']
})
export class ResumeSectionDeletedModalComponent implements OnInit {

  constructor(
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {
  }

  handleOk(): void {
    this.modal.destroy(true);
  }

  handleCancel(): void {
    this.modal.destroy(false);
  }
}
