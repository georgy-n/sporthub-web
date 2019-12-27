import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { Response } from '../infrastructure/classes/Repsonse';
import { Product } from '../infrastructure/classes/Product';
import { Router } from '@angular/router';
import { UserService } from '../infrastructure/user.service';
import { BasketStorageService } from '../infrastructure/basket-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Iterable<Product> = [];
  logged: Boolean = false;

  constructor(
    private basketStorage: BasketStorageService,
    private httpService: HttpServiceService, 
    private userService: UserService, 
    private router: Router) {
    userService.isUserLoggedIn.subscribe(v => this.logged = v)
   }

  ngOnInit() {
    this.httpService.getAllProducts().subscribe((resp: Iterable<Product>) => {
      this.products = resp;
    } );
  }

  addToBasket(product: Product) {
    this.basketStorage.saveProduct(product)
  }
}
