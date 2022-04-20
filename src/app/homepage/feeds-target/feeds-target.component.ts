import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {LikeService} from "../../services/like.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../models/post";

@Component({
  selector: 'app-feeds-target',
  templateUrl: './feeds-target.component.html',
  styleUrls: ['./feeds-target.component.css']
})
export class FeedsTargetComponent implements OnInit {
  idTargetUser!: number;
  idOwnUser = parseInt(<string>localStorage.getItem("ID"));
  newFeeds!: Post[];
  constructor(private postService: PostService,
              private likeService: LikeService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((paramsId:any) => {
      this.idTargetUser = +paramsId.id;
    });
    this.getPostListTarget()
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
  isLike(likeList: any) {
    // @ts-ignore
    return likeList.some(e => e.user.id == this.idOwnUser)
  }
}
