import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'app-topdetail',
  templateUrl: './topdetail.component.html',
  styleUrls: ['./topdetail.component.css']
})
export class TopdetailComponent implements OnInit {
  @Input() user!: User
  id = parseInt(<string>localStorage.getItem("ID"))
  constructor() { }

  ngOnInit(): void {
  }
}
