import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';

@Component({
  selector: 'app-user-admin-layout',
  templateUrl: './user-admin-layout.component.html',
  styleUrls: ['./user-admin-layout.component.less']
})
export class UserAdminLayoutComponent implements OnInit {

  constructor(
    public userDataService: UserDataService
  ) { }

  ngOnInit(): void {
  }

}
