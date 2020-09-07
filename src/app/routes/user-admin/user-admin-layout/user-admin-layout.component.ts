import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-admin-layout',
  templateUrl: './user-admin-layout.component.html',
  styleUrls: ['./user-admin-layout.component.less']
})
export class UserAdminLayoutComponent implements OnInit {

  constructor(
    public userDataService: UserDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  searchOptionChange(option:any):void {
    let url: string = `/recruit/home?type=${option.type}&city_id=${option.city_id}`;
    if(option.keywords && option.keywords.trim()) {
      url = url + '&keywords=' + option.keywords.trim();
    }
    this.router.navigateByUrl(url);
  }
}
