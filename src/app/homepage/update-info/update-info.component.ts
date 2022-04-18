import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  user!: User
  idUser = parseInt(<string>localStorage.getItem("ID"))
  formUpdateInfo !: FormGroup

  constructor(private userService: UserService,
              private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo() {
    this.userService.getUserInfo(this.idUser).subscribe((data) => {
      this.user = data;
      console.log(this.user)
      this.formUpdateInfo = this._fb.group({
        fullName:[this.user.fullName],
        email:[this.user.email],
        phone:[this.user.phone],
        dateOfBirth: [this.user.dateOfBirth],
        address:[this.user.address],
        hobbies:[this.user.hobbies]
      })
    })
  }

  onUpdate() {

  }
}
