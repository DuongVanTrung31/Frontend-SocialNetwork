import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-sidebar-widget',
  templateUrl: './sidebar-widget.component.html',
  styleUrls: ['./sidebar-widget.component.css']
})
export class SidebarWidgetComponent implements OnInit {
  idUser = parseInt(<string>localStorage.getItem("ID"));
  listFriend!:User[]
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getFriends(this.idUser).subscribe(data => this.listFriend = data)
  }

}
