import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PostComponent} from "../post/post.component";
import {Comment} from "../../models/comment";

@Component({
  selector: 'app-newfeeds',
  templateUrl: './newfeeds.component.html',
  styleUrls: ['./newfeeds.component.css']
})
export class NewfeedsComponent implements OnInit {
  @Input() user!: User;

  newFeeds!: Post[]
  constructor(private postService: PostService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNewFeeds()
  }

  getNewFeeds() {
    this.postService.getNewFeeds().subscribe((data) => {
      this.newFeeds = data;
      console.log(this.newFeeds)
    })
  }

  onPostDialog() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PostComponent,dialogConfig)
      .afterClosed().subscribe(() =>{
        this.getNewFeeds()
      }
    )
  }

  handleComment($event: Comment) {

  }
}
