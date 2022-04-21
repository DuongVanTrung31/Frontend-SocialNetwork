import {Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../../services/post.service";
import {LikeService} from "../../services/like.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../models/post";
import {CommentService} from "../../services/comment.service";
import {Comment} from "../../models/comment";
import {CommentComponent} from "../comment/comment.component";

@Component({
  selector: 'app-feeds-target',
  templateUrl: './feeds-target.component.html',
  styleUrls: ['./feeds-target.component.css']
})
export class FeedsTargetComponent implements OnInit {
  idTargetUser!: number;
  idOwnUser = parseInt(<string>localStorage.getItem("ID"));
  newFeeds!: Post[];
  @ViewChild(CommentComponent)
  child!: CommentComponent;
  constructor(private postService: PostService,
              private likeService: LikeService,
              private route: ActivatedRoute,
              private commentService :CommentService) {
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

  handleComment(pid: number | undefined, $event: Comment) {
    this.commentService.saveComment(pid, $event).subscribe(() => {
      this.getPostListTarget()
    })
    }

  onDelComment(commentId: number | undefined) {
    this.commentService.delComment(commentId).subscribe(() => {
      this.getPostListTarget()
    })
  }

  onEditComment(comment:Comment) {
    this.child.editComment(comment)
  }
}
