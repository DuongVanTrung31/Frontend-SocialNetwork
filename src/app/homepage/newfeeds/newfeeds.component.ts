import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PostComponent} from "../post/post.component";
import {CommentService} from "../../services/comment.service";
import {LikeService} from "../../services/like.service";
import {Router} from "@angular/router";
import {DialogService} from "../../services/dialog-service";
import {CommentComponent} from "../comment/comment.component";
import {Comment} from "../../models/comment";

@Component({
  selector: 'app-newfeeds',
  templateUrl: './newfeeds.component.html',
  styleUrls: ['./newfeeds.component.css']
})
export class NewfeedsComponent implements OnInit {
  @Input() user!: User;
  @Input() typePage!: string;
  idUser = parseInt(<string>localStorage.getItem("ID"))
  @ViewChild(CommentComponent)
  child!: CommentComponent;
  newFeeds!: Post[]

  constructor(private postService: PostService,
              private dialog: MatDialog,
              private commentService: CommentService,
              private likeService: LikeService,
              private router: Router,
              private dialogService: DialogService) {
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
    dialogConfig.width = "50%";
    this.dialog.open(PostComponent, dialogConfig)
      .afterClosed().subscribe(() => {
        this.ngOnInit()
      }
    )
  }

  handleComment(pid: number | undefined, $event: Comment) {
    this.commentService.saveComment(pid, $event).subscribe(() => {
      this.ngOnInit()
    })
  }

  onDelComment(commentId: number | undefined) {
    this.dialogService.openConfirmDialog('Bạn muốn xóa bình luận này ?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.commentService.delComment(commentId).subscribe(() => {
          this.ngOnInit()
        });
      }
    });
  }

  onEditComment(comment: Comment) {
    this.child.editComment(comment)
  }

  onLikeComment(commentId: number | undefined) {
    this.likeService.likeComment(commentId, this.idUser).subscribe(() => {
      this.ngOnInit()
    })
  }

  onLike(postId: number | undefined) {
    this.likeService.likePost(postId, this.idUser).subscribe(() => {
      this.ngOnInit()
    })
  }

  onTimeline(targetId: number) {
    targetId == this.idUser ?
      this.router.navigate(['/timeline']) :
      this.router.navigateByUrl('/target/' + targetId)
  }

  onDelPost(postId: number | undefined) {
    this.dialogService.openConfirmDialog('Bạn muốn xóa bài viết này ?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.postService.deletePost(postId).subscribe(() => {
          this.ngOnInit()
        });
      }
    });
  }

  onEditPostDialog(post: Post) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = post
    this.dialog.open(PostComponent, dialogConfig)
      .afterClosed().subscribe(() => {
      this.ngOnInit()
    })
  }

  isLike(likeList: any) {
    // @ts-ignore
    return likeList.some(e => e.user.id == this.idUser)
  }
}
