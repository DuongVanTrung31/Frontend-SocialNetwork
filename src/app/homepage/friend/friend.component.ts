import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  idUser = parseInt(<string>localStorage.getItem("ID"));
  userList!: User[]
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getRequest()
  }

  getRequest() {
    this.userService.getRequest(this.idUser).subscribe((data) => {
      console.log(data);
      this.userList = data
    })
  }
}
