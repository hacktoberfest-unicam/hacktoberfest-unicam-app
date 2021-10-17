import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProblemComponent } from './problem/problem.component';
import { PullRequestComponent } from './pull-request/pull-request.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'problem',
    component: ProblemComponent
  },
  {
    path: 'pull-request',
    component: PullRequestComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
