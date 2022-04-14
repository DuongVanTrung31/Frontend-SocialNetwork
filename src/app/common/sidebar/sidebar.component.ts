import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
  }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/']).then()
    }
}
