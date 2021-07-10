import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { AuthGuard } from './shared/auth-gaurd/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate : [AuthGuard] 

  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dashboard/messagedetail/:id',
    component: MessageDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



