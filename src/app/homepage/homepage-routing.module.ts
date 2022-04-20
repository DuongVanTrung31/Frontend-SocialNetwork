import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./homepage.component";
import {TimelineComponent} from "./timeline/timeline.component";
import {InfoUserComponent} from "./info-user/info-user.component";
import {PasswordComponent} from "./password/password.component";
import {DetailUserComponent} from "./detail-user/detail-user.component";
import {UpdateInfoComponent} from "./update-info/update-info.component";
import {FriendComponent} from "./friend/friend.component";
import {UserTimelineComponent} from "./user-timeline/user-timeline.component";
import {FeedsTargetComponent} from "./feeds-target/feeds-target.component";
import {FriendTargetComponent} from "./friend-target/friend-target.component";
import {SearchFilterComponent} from "./search-filter/search-filter.component";

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'timeline',
    component: TimelineComponent
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
        path: 'update',
        component: UpdateInfoComponent
      },
      {
        path: 'friend',
        component: FriendComponent
      }
    ]
  },
  {
    path: 'target/:id',
    component: UserTimelineComponent,
    children: [
      {
        path: '',
        component: FeedsTargetComponent
      },
      {
        path: 'friends/:id',
        component: FriendTargetComponent
      }
    ]
  },
  {
    path: 'search',
    component: SearchFilterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule {
}
