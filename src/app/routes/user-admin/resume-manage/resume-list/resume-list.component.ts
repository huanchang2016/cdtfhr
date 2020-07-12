import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.less']
})
export class ResumeListComponent implements OnInit {
  list:any[] = [];
  loadingData: boolean = true;

  constructor() { }

  ngOnInit(): void {

    this.getDataList();
  }

  getDataList() {
    this.loadingData = true;
    setTimeout(() => {
      this.list = [];
      this.loadingData = false;
    }, 1000);
  }
}
