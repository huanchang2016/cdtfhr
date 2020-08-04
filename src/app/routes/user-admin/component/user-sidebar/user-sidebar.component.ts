import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../service/user-data.service';

@Component({
  selector: 'app-user-admin-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.less']
})
export class UserSidebarComponent implements OnInit {
  profile:any = null;

  constructor(
    public userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.userDataService.getProfile().then( v => this.profile = v );
  }

}
