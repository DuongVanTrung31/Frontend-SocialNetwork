import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";
import {ResponseSearch} from "../../models/dto/response-search";
import {LikeService} from "../../services/like.service";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {
  search!:string;
  responseSearch!:ResponseSearch
  id = parseInt(<string>localStorage.getItem("ID"));
  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private likeService:LikeService,
              private commentService:CommentService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.search = params['name'];
    })
    this.postService.search(this.id,this.search).subscribe(data => {
      this.responseSearch = data
    })
  }

  onLikeComment(commentId:number| undefined) {
    this.likeService.likeComment(commentId, this.id).subscribe(() => {
      this.ngOnInit()
    })
  }
  onLike(postId:number| undefined) {
    this.likeService.likePost(postId, this.id).subscribe(() => {
      this.ngOnInit()
    })
  }
  isLike(likeList: any) {
    // @ts-ignore
    return likeList.some(e => e.user.id == this.id)
  }

  handleComment(pid: number | undefined, $event: string) {
    const comment = {
      content: $event,
      user: {
        id: this.id
      }
    }
    this.commentService.saveComment(pid, comment).subscribe(() => {
      this.ngOnInit()
    })
  }

  onDelComment(commentId: number | undefined) {
    this.commentService.delComment(commentId).subscribe(() => {
      this.ngOnInit()
    })
  }

  onEditComment() {

  }
}
