import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../models/user";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Comment} from "../../models/comment";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  user!: User;
  idOwnUser = parseInt(<string>localStorage.getItem("ID"));
  @Output() commentEvent = new EventEmitter<Comment>()
  formComment: FormGroup = new FormGroup({
    id: new FormControl(""),
    content: new FormControl("")
  })
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUserInfo(this.idOwnUser).subscribe(data => this.user = data)
  }

  handleEnter() {
    const comment:Comment = {
      id:this.formComment.value.id,
      content: this.formComment.value.content,
      likeCommentList: [],
      user: this.user,
    }
    this.commentEvent.emit(comment);
    this.formComment.reset();
  }


  editComment(comment:Comment) {
    this.formComment.patchValue(comment)
  }
}
