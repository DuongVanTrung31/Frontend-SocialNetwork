import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user!: User
  id = parseInt(<string>localStorage.getItem("ID"));
  searchForm: FormGroup = new FormGroup({
    nameSearch: new FormControl('')
  })

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserInfo(this.id).subscribe(data => this.user = data)
  }

  onSearch() {
    this.router.navigate(['/search'], {queryParams: {name: this.searchForm.value.nameSearch}});
  }
}
