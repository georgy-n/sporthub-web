import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/infrastructure/user.service';
import { BasketStorageService } from '../infrastructure/basket-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public logged: Boolean = false;
  public admin: Boolean = false;
  public basketSize: Number = 0;
  
  constructor(
    private basketStorage: BasketStorageService,
    private authService: UserService, 
    private router: Router) { }

  ngOnInit() {
    this.authService.isUserLoggedIn.subscribe(value => this.logged = value);
    this.authService.isAdmin.subscribe(value => this.admin = value) 
    this.basketStorage.basket.subscribe(value => this.basketSize = value.length)
  }

  showAdmin() {
    return this.admin;
  }
}
