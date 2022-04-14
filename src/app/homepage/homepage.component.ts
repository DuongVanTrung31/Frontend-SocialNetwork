import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user!: User;
  id = parseInt(<string>localStorage.getItem("ID"))
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo() {
    this.userService.getUserInfo(this.id).subscribe((data) => {
      this.user = data
    })
  }
}
