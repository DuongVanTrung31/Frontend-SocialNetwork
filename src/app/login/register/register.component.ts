import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {first} from "rxjs";
import {RegisterDto} from "../../models/dto/register-dto";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  registerData!: RegisterDto;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword:['',Validators.required],
      email: ['',Validators.required],
      phone: [''],
      dateOfBirth: ['']
    });
  }

  onRegister() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formRegister.invalid) {
      return;
    }
    this.loading = true;
    this.registerData = this.formRegister.value
    this.userService.register(this.registerData)
      .pipe(
        first()
      )
      .subscribe(
        data => {
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error => {
          switch (error.error) {
            case 700:
              // @ts-ignore
              document.querySelector("#error-username").innerHTML = "Tài khoản đã tồn tại";
              break;
            case 701:
              // @ts-ignore
              document.querySelector("#error-repass").innerHTML = "Mật khẩu không trùng nhau";
              break;
            case 702:
              // @ts-ignore
              document.querySelector("#error-email").innerHTML = "Email đã tồn tại";
              break;
          }
        })
  }
}
