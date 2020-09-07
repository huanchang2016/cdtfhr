import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { format } from 'date-fns';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-oper-save-modal',
  templateUrl: './oper-save-modal.component.html',
  styleUrls: ['./oper-save-modal.component.less']
})
export class OperSaveModalComponent implements OnInit {
  @Input() resumeInfo: any;

  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService,
    private http: HttpClient
  ) { }

  submitLoading: boolean = false;

  handleCancel() {
    this.submitLoading = false;
    this.destroyModal();
  }

  type: string = null;
  handleOk() {

    if (!this.type) {
      this.msg.warning('未选择简历保存格式');
      return;
    }


    this.submitLoading = true;
    let url: string = '';
    let headers: HttpHeaders;
    if (this.type === 'pdf') {
      url = '/v1/web/com/resume/save_pdf';
      headers = new HttpHeaders().append("Content-Type", "application/json");
      // headers.append('Content-Description', 'File Transfer');
      // headers.append('Accept-Encoding', 'binary');
      
    } else {
      url = '/v1/web/com/resume/save_word';
      headers = new HttpHeaders().append("Content-Type", "application/json");
    }
    const opt: any = { resume_id: this.resumeInfo.id };

    this.http.post(url, opt, {
      responseType: "blob",
      headers: headers
    }).subscribe(resp => {
      // resp: 文件流
      this.submitLoading = false;
      this.downloadFile(resp);
    }, err => this.submitLoading = false);

  }

  downloadFile(data): void {
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);

    // 以动态创建a标签进行下载
    const a = document.createElement('a');
    const fileName = format(new Date(), 'yyyyMMddHHmmss');
    a.href = url;
    // a.download = fileName;
    a.download = `${fileName}_${this.resumeInfo.name}_${this.resumeInfo.title}.${this.type}`;
    this.msg.success('简历保存成功');
    a.click();
    window.URL.revokeObjectURL(url);
  }

  destroyModal(data?: any): void {
    this.modal.destroy(data);
  }

  ngOnInit(): void {
    console.log('保存简历 works: 可以对应的选择当前简历的保存格式，如：PDF，word等等')
  }

}
