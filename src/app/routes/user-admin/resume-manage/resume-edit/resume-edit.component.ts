import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-resume-edit',
  templateUrl: './resume-edit.component.html',
  styleUrls: ['./resume-edit.component.less']
})
export class ResumeEditComponent implements OnInit {

  constructor(
    private settingService: GlobalSettingsService
  ) {
    this.settingService.setTitle('修改简历-简历管理-个人中心-天府菁英网');
  }

  ngOnInit(): void {
  }

}
