import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'app-topdetail',
  templateUrl: './topdetail.component.html',
  styleUrls: ['./topdetail.component.css']
})
export class TopdetailComponent implements OnInit {
  @Input() user!: User
  constructor() { }

  ngOnInit(): void {
  }
}
