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


@NgModule({
  declarations: [
    HomepageComponent,
    NavbarComponent,
    SidebarComponent,
    NewfeedsComponent,
    PostComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class HomepageModule { }
