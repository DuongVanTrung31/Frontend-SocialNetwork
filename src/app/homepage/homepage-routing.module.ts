import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage.component";
import {TimelineComponent} from "./timeline/timeline.component";
import {InfoUserComponent} from "./info-user/info-user.component";
import {PasswordComponent} from "./password/password.component";
import {DetailUserComponent} from "./detail-user/detail-user.component";
import {UpdateInfoComponent} from "./update-info/update-info.component";

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'timeline',
    component: TimelineComponent,
  },
  {
    path: 'info',
    component: InfoUserComponent,
    children: [
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: '',
        component: DetailUserComponent
      },
      {
        path:'update',
        component: UpdateInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
