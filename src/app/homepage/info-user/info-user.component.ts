import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {
  user!: User
  idUser = parseInt(<string>localStorage.getItem("ID"))

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo() {
    this.userService.getUserInfo(this.idUser).subscribe((data) => {
      this.user = data
    })
  }
}
