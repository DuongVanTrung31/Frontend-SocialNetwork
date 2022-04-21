import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";
import {ResponseSearch} from "../../models/dto/response-search";
import {LikeService} from "../../services/like.service";
import {CommentService} from "../../services/comment.service";
import {CommentComponent} from "../comment/comment.component";
import {Comment} from "../../models/comment";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {
  search!:string;
  responseSearch!:ResponseSearch
  id = parseInt(<string>localStorage.getItem("ID"));
  user!:User
  @ViewChild(CommentComponent)
  child!: CommentComponent;
  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private likeService:LikeService,
              private commentService:CommentService,
              private userService:UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.search = params['name'];
      this.postService.search(this.id,this.search).subscribe(data => {
        this.responseSearch = data
        this.userService.getUserInfo(this.id).subscribe(data => this.user = data)
      })
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

  handleComment(pid: number | undefined, $event: Comment) {
    this.commentService.saveComment(pid, $event).subscribe(() => {
      this.ngOnInit()
    })
  }

  onDelComment(commentId: number | undefined) {
    this.commentService.delComment(commentId).subscribe(() => {
      this.ngOnInit()
    })
  }

  onEditComment(comment: Comment) {
    this.child.editComment(comment)
  }

}
