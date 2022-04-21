import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChangePasswordForm} from "../../models/dto/change-password-form";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  idUser = parseInt(<string>localStorage.getItem("ID"))
  formPassword: FormGroup = new FormGroup({
    currentPassword : new FormControl('',Validators.required),
    newPassword : new FormControl('',Validators.required),
    confirmNewPassword : new FormControl('',Validators.required)
  })
  constructor(private userService: UserService,
              private router:Router,
              private toast:ToastrService) { }

  ngOnInit(): void {
  }

  onChangeSubmit() {
    const changePasswordForm: ChangePasswordForm = {
      ...this.formPassword.value
    }
    // @ts-ignore
    document.querySelector("#err-currpass").innerHTML = "";
    // @ts-ignore
    document.querySelector("#err-renewpass").innerHTML = "";
    this.userService.changePassword(this.idUser,changePasswordForm).subscribe(
      data => {
          this.formPassword.reset()
          this.toast.success("Đổi mật khẩu thành công","Thành công")
          this.router.navigate(['../'])
      },
      error => {
        if(error.error == 600) {
          // @ts-ignore
          document.querySelector("#err-currpass").innerHTML = "Sai mật khẩu hiện tại";
          // @ts-ignore
          document.querySelector("#err-renewpass").innerHTML = "Mật khẩu xác nhận không trùng";
        } else if(error.error == 601) {
          // @ts-ignore
          document.querySelector("#err-renewpass").innerHTML = "Mật khẩu xác nhận không trùng";
        } else if(error.error == 602) {
          // @ts-ignore
          document.querySelector("#err-currpass").innerHTML = "Sai mật khẩu hiện tại";
        }
      });
  }
}
