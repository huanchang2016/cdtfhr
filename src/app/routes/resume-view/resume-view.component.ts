import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.less']
})
export class ResumeViewComponent implements OnInit {


  list:any[] = [1, 2];

  resume_id:number;

  resumeInfo:any = null;
  loadingData:boolean = true;

  // type: 'company' | 'user' = 'user';

  constructor(
    private activatedRoute: ActivatedRoute,
    public settingService: GlobalSettingsService
  ) {

    
    this.activatedRoute.params.subscribe((params:Params) => {
      this.resume_id = +params['id'];
      if(this.resume_id) {
        this.getInfo();
      }
    })
  }

  ngOnInit(): void {}

  getInfo():void {
    this.loadingData = true;
    this.settingService.get(`/v1/web/user/resume/${this.resume_id}`).subscribe((res:ApiData) => {
      console.log('resumeInfo works!', res.data);
      this.loadingData = false;
      this.resumeInfo = res.data;
    }, err => this.loadingData = false);
  }


}
