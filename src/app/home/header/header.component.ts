import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public logged: Boolean = false;
  public admin: Boolean = false;
  constructor(private authService: UserService, private router: Router) { }

  ngOnInit() {
    this.logged = this.authService.isAuth;
    this.admin = this.logged && (this.authService.user.role == 'ADMIN') 
  }

  showAdmin() {
    return this.admin;
  }
}
