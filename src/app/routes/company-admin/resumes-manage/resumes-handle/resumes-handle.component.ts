import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumes-handle',
  templateUrl: './resumes-handle.component.html',
  styleUrls: ['./resumes-handle.component.less']
})
export class ResumesHandleComponent implements OnInit {

  search_text:string = '';
  searchLoading: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  
  search(): void {
    console.log(this.search_text, 'search_ text info');

    this.searchLoading = true;
    setTimeout(() => {
      this.searchLoading = false;
    }, 500);
  }

}
