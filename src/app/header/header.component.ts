import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/infrastructure/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public logged: Boolean = false;
  public admin: Boolean = false;
  
  constructor(
    private authService: UserService, 
    private router: Router) { }

  ngOnInit() {
    this.authService.isUserLoggedIn.subscribe(value => this.logged = value);
    this.authService.isAdmin.subscribe(value => this.admin = value) 
  }

  showAdmin() {
    return this.admin;
  }
}
