import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  user!: User
  idUser = parseInt(<string>localStorage.getItem("ID"))
  formUpdateInfo : FormGroup  = new FormGroup({})

  constructor(private userService: UserService,
              private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUserInfo()
    this.formUpdateInfo = this._fb.group({
      fullName:[''],
      email:[''],
      phone:[''],
      dateOfBirth: [''],
      address:[''],
      hobbies:['']
    })
  }

  getUserInfo() {
    this.userService.getUserInfo(this.idUser).subscribe((data) => {
      this.user = data;
      this.formUpdateInfo.controls['fullName'].setValue(this.user.fullName)
      this.formUpdateInfo.controls['email'].setValue(this.user.email)
      this.formUpdateInfo.controls['phone'].setValue(this.user.phone)
      this.formUpdateInfo.controls['dateOfBirth'].setValue(this.user.dateOfBirth)
      this.formUpdateInfo.controls['address'].setValue(this.user.address)
      this.formUpdateInfo.controls['hobbies'].setValue(this.user.hobbies)
    })
  }

  onUpdate() {
    const userInfo  = {
      fullName:this.formUpdateInfo.value.fullName,
      email:this.formUpdateInfo.value.email,
      phone:this.formUpdateInfo.value.phone,
      dateOfBirth: this.formUpdateInfo.value.dateOfBirth,
      address:this.formUpdateInfo.value.address,
      hobbies:this.formUpdateInfo.value.hobbies
    }
    this.userService.updateInfo(this.idUser, userInfo).subscribe(() => {
      this.ngOnInit()
    })
  }
}
