import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-celebrity-not-pass',
  templateUrl: './celebrity-not-pass.component.html',
  styleUrls: ['./celebrity-not-pass.component.less']
})
export class CelebrityNotPassComponent {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  celebrity() {
    this.router.navigateByUrl('/admin/user/certification');
  }

}
