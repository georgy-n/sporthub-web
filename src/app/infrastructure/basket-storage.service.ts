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
  countProduct: BehaviorSubject<{[pid: string]: number}> = new BehaviorSubject<{[pid: string]: number}>({});
  constructor(private httpService: HttpServiceService) { }

  public clean() {
    this.basket.next([])
    this.countProduct.next({})
  }
  
  public saveProduct(product: Product) {
    let id = product.id.toString()
    console.log(this.countProduct.value[id])
    if (this.countProduct.value[id] != undefined) {
      var newcount = this.countProduct.value
      newcount[id] = newcount[id] + 1
      this.countProduct.next(newcount)
    }
    else {
      var newcount = this.countProduct.value
      newcount[id] = 1
      this.countProduct.next(newcount)
      this.basket.next(this.basket.value.concat(product))
    }
  }

  public createOrder(email: String, products: Array<Product>, token: String): Observable<void> {
    let orderRequest = new OrderRequest(email, this.countProduct.value)
    return this.httpService.createOrder(orderRequest, token)
  }
}
