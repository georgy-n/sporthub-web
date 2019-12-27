import { Injectable } from '@angular/core';
import { Product } from './classes/Product';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from './http-service.service';
import { OrderRequest } from './classes/OrderRequest';

@Injectable({
  providedIn: 'root'
})
export class BasketStorageService {

  basket: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  
  constructor(private httpService: HttpServiceService) { }

  public saveProduct(product: Product) {
    this.basket.next(this.basket.value.concat(product))
  }

  public createOrder(email: String, products: Array<Product>, token: String): Observable<void> {
    let orderRequest = new OrderRequest(email, products.map(v => v.id))
    return this.httpService.createOrder(orderRequest, token)
  }
}
