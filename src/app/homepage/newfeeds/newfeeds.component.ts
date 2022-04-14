import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PostComponent} from "../post/post.component";
import {Comment} from "../../models/comment";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-newfeeds',
  templateUrl: './newfeeds.component.html',
  styleUrls: ['./newfeeds.component.css']
})
export class NewfeedsComponent implements OnInit {
  @Input() user!: User;
  idUser = parseInt(<string>localStorage.getItem("ID"))
  @Input() typePage!: string;
  newFeeds!: Post[]

  constructor(private postService: PostService,
              private dialog: MatDialog,
              private commentService: CommentService) {
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
    dialogConfig.disableClose = true;
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

  handleComment(pid: number | undefined, $event: Comment) {
    this.commentService.saveComment(pid, $event).subscribe(() => {
      if (this.typePage == "newfeeds") {
        this.getNewFeeds()
      } else if (this.typePage == "timeline") {
        this.getTimeLine()
      }
    })
  }
}
