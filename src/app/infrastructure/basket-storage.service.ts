import { Injectable } from '@angular/core';
import { Product } from './classes/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketStorageService {

  basket: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  
  constructor() { }

  public saveProduct(product: Product) {
    this.basket.next(this.basket.value.concat(product))
  }
}
