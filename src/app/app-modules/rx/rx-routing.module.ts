import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RxDashboardComponent } from './rx-dashboard/rx-dashboard.component';


const routes: Routes = [
  {
    path: 'disperse/:beneficiaryRegID',
    component: RxDashboardComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxRoutingModule { }
