import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";

@Component({
  selector: 'app-newfeeds',
  templateUrl: './newfeeds.component.html',
  styleUrls: ['./newfeeds.component.css']
})
export class NewfeedsComponent implements OnInit {
  @Input() user!: User;
  newFeeds!: Post[]
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getNewFeeds()
  }

  getNewFeeds() {
    this.postService.getNewFeeds().subscribe((data) => {
      console.log(data);
      this.newFeeds = data
    })
  }
}
