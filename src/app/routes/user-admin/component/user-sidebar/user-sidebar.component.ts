import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../service/user-data.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-user-admin-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.less']
})
export class UserSidebarComponent implements OnInit {

  environment = environment;
  
  profile:any = null;

  constructor(
    public userDataService: UserDataService
  ) { }

  total: number = 0;

  ngOnInit(): void {
    
    if(this.userDataService.userProfile) {
      this.profile = this.userDataService.userProfile;
      this.countTotal();
    }else {
      this.userDataService.getProfile().then( v => {
        this.profile = v;
        this.countTotal();
      } );
    }
  }

  countTotal():void {
    if(this.profile.status === 0) {
      this.total++;
    }
    if(this.profile.complete === 0) {
      this.total++;
    }
  }

}
