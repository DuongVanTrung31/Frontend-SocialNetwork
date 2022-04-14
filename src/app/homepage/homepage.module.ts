import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import {NavbarComponent} from "../common/navbar/navbar.component";
import {SidebarComponent} from "../common/sidebar/sidebar.component";
import { NewfeedsComponent } from './newfeeds/newfeeds.component';
import { PostComponent } from './post/post.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomepageComponent,
    NavbarComponent,
    SidebarComponent,
    NewfeedsComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomepageModule { }
