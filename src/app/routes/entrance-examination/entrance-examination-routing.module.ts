import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntranceHomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: EntranceHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntranceExaminationRoutingModule { }
