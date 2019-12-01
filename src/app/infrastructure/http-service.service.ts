import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Response } from '../infrastructure/Repsonse';
import { Product } from './Product';
@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  constructor(private http: HttpClient) { }
  private backUrl = "https://onlineshop-ekb.herokuapp.com"

  login(login: string, password: string) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let body = JSON.stringify({
      username: login,
      password: password
    });
    let req =
      this.http.post(this.backUrl + '/authenticate',
        body,
        {
          responseType: 'json',
          headers: myHeaders
        });
    return req;
  }

  getAllProducts() {
    return this.http.get(this.backUrl + "/api/allProducts").pipe(
      map(answer => {
        const res = answer.valueOf() as Response;
        if (res && res.status === 'OK') {
          const products = res.payload.valueOf() as Iterable<Product>;
          return products;

        } else {
          throw Error(res.message);
        }
      })
    );
  }
}
