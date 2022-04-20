import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {FriendService} from "../../services/friend.service";

@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.css']
})
export class UserTimelineComponent implements OnInit {
  idTargetUser!: number;
  idOwnUser = parseInt(<string>localStorage.getItem("ID"));
  targetUser!: User;
  relationship!:string;
  mutualList!: User[];

  constructor(private route: ActivatedRoute,
              private userService:UserService,
              private friendService:FriendService) { }

  ngOnInit(): void {
    this.route.params.subscribe((paramsId:any) => {
      this.idTargetUser = +paramsId.id;
    });
    this.getInfo();
    this.checkRelationship();
    this.getMutualFriends();
  }

  getInfo() {
    this.userService.getUserInfo(this.idTargetUser).subscribe((data) => {
      this.targetUser = data
    })
  }

  checkRelationship() {
    this.friendService.checkRelationship(this.idOwnUser,this.idTargetUser).subscribe((data) => {
      this.relationship = data;
    })
  }

  onAddFriend() {
    this.friendService.addFriend(this.idOwnUser,this.idTargetUser).subscribe(() => this.ngOnInit())
  }

  onUnFriend() {
    this.friendService.unFriend(this.idOwnUser,this.idTargetUser).subscribe(() => this.ngOnInit())
  }

  onBlock() {
    this.friendService.blockFriend(this.idOwnUser,this.idTargetUser).subscribe(() => this.ngOnInit())
  }


  getMutualFriends() {
    this.friendService.mutualFriends(this.idOwnUser,this.idTargetUser).subscribe((data) => {
        this.mutualList = data;
    })
  }

}
