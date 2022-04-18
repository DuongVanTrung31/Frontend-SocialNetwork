import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {FriendService} from "../../services/friend.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  idUser = parseInt(<string>localStorage.getItem("ID"));
  userList!: {
    friendList: User[],
    respList: User[],
    reqList: User[]
  }
  constructor(private userService: UserService,
              private friendService: FriendService) { }

  ngOnInit(): void {
    forkJoin([
      this.userService.getFriends(this.idUser),
      this.userService.getRequestToMe(this.idUser),
      this.userService.getRequestFromMe(this.idUser),
    ],
      (friendList,respList,reqList) => {
      return {
        friendList,
        respList,
        reqList
      }
    }).subscribe(data => {
      this.userList = {
        ...data
      }
    })
  }


  onUnFriend(targetId:number) {
    this.friendService.unFriend(this.idUser,targetId).subscribe(() => {
      this.ngOnInit()
    })
  }

  onBlock(targetId:number) {
    this.friendService.blockFriend(this.idUser,targetId).subscribe(() => {
      this.ngOnInit()
    })
  }

  onAcceptFriend(targetId:number) {
    this.friendService.acceptFriend(this.idUser,targetId).subscribe(() => {
      this.ngOnInit()
    })
  }
}
