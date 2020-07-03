import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyIndexComponent } from './index/index.component';
// import { CompanyHomeComponent } from './component/home/home.component';
// import { RecruitPositionsComponent } from './component/recruit-positions/recruit-positions.component';


const routes: Routes = [
  { path: '', component: CompanyIndexComponent
    // children: [
    //   { path: '', redirectTo: 'home', pathMatch: 'full' },
    //   { path: 'home', component: CompanyHomeComponent },
    //   { path: 'recruit', component: RecruitPositionsComponent }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
