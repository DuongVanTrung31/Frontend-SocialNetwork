import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user";
import {FormControl, FormGroup} from "@angular/forms";
import {Comment} from "../../models/comment";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() user!: User;
  @Output() commentEvent = new EventEmitter<string>()
  formComment: FormGroup = new FormGroup({
    content: new FormControl("")
  })
  constructor() { }

  ngOnInit(): void {
  }

  handleEnter() {
    this.commentEvent.emit(this.formComment.value.content);
    this.formComment.reset();
  }

}
