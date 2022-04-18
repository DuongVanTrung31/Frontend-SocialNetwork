import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import {NavbarComponent} from "../common/navbar/navbar.component";
import {SidebarComponent} from "../common/sidebar/sidebar.component";
import { NewfeedsComponent } from './newfeeds/newfeeds.component';
import { PostComponent } from './post/post.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { CommentComponent } from './comment/comment.component';
import {TimelineComponent} from "./timeline/timeline.component";
import { TopdetailComponent } from './topdetail/topdetail.component';
import { InfoUserComponent } from './info-user/info-user.component';
import { PasswordComponent } from './password/password.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { FriendComponent } from './friend/friend.component';
import { UserTimelineComponent } from './user-timeline/user-timeline.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    HomepageComponent,
    NavbarComponent,
    SidebarComponent,
    NewfeedsComponent,
    PostComponent,
    CommentComponent,
    TimelineComponent,
    TopdetailComponent,
    InfoUserComponent,
    PasswordComponent,
    DetailUserComponent,
    UpdateInfoComponent,
    FriendComponent,
    UserTimelineComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class HomepageModule { }
