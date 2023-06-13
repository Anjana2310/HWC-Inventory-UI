import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ServiceComponent } from './service/service.component';

import { SetPasswordComponent } from './set-password/set-password.component';
import { SetSecurityQuestionsComponent } from './set-security-questions/set-security-questions.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './app-modules/core/services/auth-guard.service';
import { FacilitySelectionComponent } from './facility-selection/facility-selection.component';
import { RedirInComponent } from './redir-in/redir-in.component';

import { DashboardComponent } from './app-modules/inventory/dashboard/dashboard.component';
import { LoadStoreDetailsComponent } from './load-store-details/load-store-details.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'redirin',
    component: RedirInComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'set-security-questions',
    component: SetSecurityQuestionsComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'set-password',
    component: SetPasswordComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'service',
    component: ServiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'facility',
    component: FacilitySelectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'loadStores',
    component:LoadStoreDetailsComponent,
  },
  {
    path: 'inventory',
    canActivate: [AuthGuard],
    loadChildren: './app-modules/inventory/inventory.module#InventoryModule'
  },
  {
    path: 'rx',
    canActivate: [AuthGuard],
    loadChildren: './app-modules/rx/rx.module#RxModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
