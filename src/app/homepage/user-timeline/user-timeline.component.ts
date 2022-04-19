import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Post} from "../../models/post";
import {PostService} from "../../services/post.service";
import {FriendService} from "../../services/friend.service";
import {LikeService} from "../../services/like.service";

@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.css']
})
export class UserTimelineComponent implements OnInit {
  idTargetUser!: number;
  idOwnUser = parseInt(<string>localStorage.getItem("ID"));
  targetUser!: User;
  newFeeds!: Post[];
  relationship!:string;

  constructor(private route: ActivatedRoute,
              private userService:UserService,
              private postService: PostService,
              private friendService:FriendService,
              private likeService:LikeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((paramsId:any) => {
      this.idTargetUser = +paramsId.id;
    });
    this.getInfo();
    this.checkRelationship();
    this.getPostListTarget();
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

  getPostListTarget() {
    this.postService.listPostTarget(this.idOwnUser,this.idTargetUser).subscribe((data) => {
      this.newFeeds = data
    })
  }

  onLikeComment(commentId:number| undefined) {
    this.likeService.likeComment(commentId, this.idOwnUser).subscribe(() => {
        this.getPostListTarget()
    })
  }

  onLike(postId:number| undefined) {
    this.likeService.likePost(postId, this.idOwnUser).subscribe(() => {
      this.getPostListTarget()
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
}
