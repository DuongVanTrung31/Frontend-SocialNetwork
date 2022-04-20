import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  user!: User;
  idOwnUser = parseInt(<string>localStorage.getItem("ID"));
  @Output() commentEvent = new EventEmitter<string>()
  formComment: FormGroup = new FormGroup({
    content: new FormControl("")
  })
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUserInfo(this.idOwnUser).subscribe(data => this.user = data)
  }

  handleEnter() {
    this.commentEvent.emit(this.formComment.value.content);
    this.formComment.reset();
  }
}
