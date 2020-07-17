import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.less']
})
export class ResumeViewComponent implements OnInit {

  list:any[] = [1, 2];
  constructor() { }

  ngOnInit(): void {
  }

}
