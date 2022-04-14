import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  user!: User
  idUser = parseInt(<string>localStorage.getItem("ID"))

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo() {
    this.userService.getUserInfo(this.idUser).subscribe((data) => {
      this.user = data
    })
  }
}
