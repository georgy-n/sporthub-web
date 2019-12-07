import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public logged: Boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.logged = this.authService.isAuth;
  }
}
