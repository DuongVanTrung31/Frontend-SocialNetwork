import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.css']
})
export class UserTimelineComponent implements OnInit {
  id!: number
  targetUser!: User
  constructor(private route: ActivatedRoute,
              private userService:UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe((paramsId:any) => {
      this.id = +paramsId.id;
    });
    this.getInfo();
  }

  getInfo() {
    this.userService.getUserInfo(this.id).subscribe((data) => {
      this.targetUser = data
    })
  }
}
