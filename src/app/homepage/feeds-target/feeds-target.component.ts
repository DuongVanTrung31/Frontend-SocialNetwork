import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {LikeService} from "../../services/like.service";

@Component({
  selector: 'app-feeds-target',
  templateUrl: './feeds-target.component.html',
  styleUrls: ['./feeds-target.component.css']
})
export class FeedsTargetComponent implements OnInit {

  constructor(private postService: PostService,
              private likeService: LikeService) {
  }

  ngOnInit(): void {
  }
}
