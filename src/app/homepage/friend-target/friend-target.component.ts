import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {forkJoin} from "rxjs";
import {UserService} from "../../services/user.service";
import {FriendService} from "../../services/friend.service";

@Component({
  selector: 'app-friend-target',
  templateUrl: './friend-target.component.html',
  styleUrls: ['./friend-target.component.css']
})
export class FriendTargetComponent implements OnInit {
  idTargetUser!: number
  idOwnUser = parseInt(<string>localStorage.getItem("ID"));
  targetFriendList!: {
    friends:User[],
    mutualFriend:User[]
  }
  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private friendService:FriendService) { }

  ngOnInit(): void {
    this.route.params.subscribe((paramsId:any) => {
      this.idTargetUser = +paramsId.id;
    });
    forkJoin([
        this.userService.getFriends(this.idTargetUser),
        this.friendService.mutualFriends(this.idOwnUser,this.idTargetUser)
      ],
      (friends,mutualFriend) => {
        return {
          friends,
          mutualFriend,
        }
      }).subscribe(data => {
      this.targetFriendList = data
      })
  }

  onUnFriend(targetId:number) {
    this.friendService.unFriend(this.idOwnUser,targetId).subscribe(() => {
      this.ngOnInit()
    })
  }

  onBlock(targetId:number) {
    this.friendService.blockFriend(this.idOwnUser,targetId).subscribe(() => {
      this.ngOnInit()
    })
  }
}
