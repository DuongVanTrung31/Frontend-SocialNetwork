import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user!: User
  id = parseInt(<string>localStorage.getItem("ID"))
  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserInfo(this.id).subscribe(data => this.user = data)
  }

}
