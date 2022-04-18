import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PostComponent} from "../post/post.component";
import {Comment} from "../../models/comment";
import {CommentService} from "../../services/comment.service";
import {LikeService} from "../../services/like.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-newfeeds',
  templateUrl: './newfeeds.component.html',
  styleUrls: ['./newfeeds.component.css']
})
export class NewfeedsComponent implements OnInit {
  @Input() user!: User;
  @Input() typePage!: string;
  idUser = parseInt(<string>localStorage.getItem("ID"))

  newFeeds!: Post[]

  constructor(private postService: PostService,
              private dialog: MatDialog,
              private commentService: CommentService,
              private likeService: LikeService,
              private router:Router) {
  }

  ngOnInit(): void {
    if (this.typePage == "newfeeds") {
      this.getNewFeeds()
    } else if (this.typePage == "timeline") {
      this.getTimeLine()
    }
  }

  getNewFeeds() {
    this.postService.getNewFeeds(this.idUser).subscribe((data) => {
      this.newFeeds = data;
    })
  }

  getTimeLine() {
    this.postService.getTimeLine(this.idUser).subscribe((data) => {
      this.newFeeds = data
    })
  }

  onPostDialog() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PostComponent, dialogConfig)
      .afterClosed().subscribe(() => {
        if (this.typePage == "newfeeds") {
          this.getNewFeeds()
        } else if (this.typePage == "timeline") {
          this.getTimeLine()
        }
      }
    )
  }

  handleComment(pid: number | undefined, $event: string) {
    const comment:Comment = {
      likeCommentList: [],
      content: $event,
      user: this.user
    }
    this.commentService.saveComment(pid, comment).subscribe(() => {
      if (this.typePage == "newfeeds") {
        this.getNewFeeds()
      } else if (this.typePage == "timeline") {
        this.getTimeLine()
      }
    })
  }

  onDelComment(commentId: number| undefined) {
    this.commentService.delComment(commentId).subscribe(() => {
      if (this.typePage == "newfeeds") {
        this.getNewFeeds()
      } else if (this.typePage == "timeline") {
        this.getTimeLine()
      }
    })
  }

  onLikeComment(commentId:number| undefined) {
    this.likeService.likeComment(commentId, this.idUser).subscribe(() => {
      if (this.typePage == "newfeeds") {
        this.getNewFeeds()
      } else if (this.typePage == "timeline") {
        this.getTimeLine()
      }
    })
  }

  onLike(postId:number | undefined) {
    this.likeService.likePost(postId, this.idUser).subscribe(() => {
      if (this.typePage == "newfeeds") {
        this.getNewFeeds()
      } else if (this.typePage == "timeline") {
        this.getTimeLine()
      }
    })
  }

  onTimeline(userId:number) {
    this.router.navigateByUrl('/home/' + userId)
  }

  onDelPost(postId:number| undefined) {
    this.postService.deletePost(postId).subscribe(() => {
      if (this.typePage == "newfeeds") {
        this.getNewFeeds()
      } else if (this.typePage == "timeline") {
        this.getTimeLine()
      }
    })
  }

  onEditPostDialog(post:Post) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = post
    this.dialog.open(PostComponent, dialogConfig)
      .afterClosed().subscribe(() => {
        if (this.typePage == "newfeeds") {
          this.getNewFeeds()
        } else if (this.typePage == "timeline") {
          this.getTimeLine()
        }
      }
    )
  }

}
