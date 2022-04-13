import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {first} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  returnUrl!: string;
  submitted = false;
  loading = false;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
    if(localStorage.getItem("ACCESS_TOKEN") != null) {
      this.router.navigate(['/']).then()
    }
  }

  ngOnInit(): void {
    // @ts-ignore
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/home';
  }

  onLogin() {
    this.submitted = true;
    this.loading = true;
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          // @ts-ignore
          localStorage.setItem('ACCESS_TOKEN', data.token);
          // @ts-ignore
          localStorage.setItem('ROLE', data.role[0].authority);
          // @ts-ignore
          localStorage.setItem('USERNAME', data.userName);
          // @ts-ignore
          if (data.role[0].authority == "ROLE_USER") {
            this.router.navigate([this.returnUrl]).then()
          }
        },
        error => {
          alert("Tài khoản của bạn đã bị khoá hoặc sai mật khẩu!");
          this.loading = false;
        });
  }
}
