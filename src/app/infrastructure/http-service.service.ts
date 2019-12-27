import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Response } from './classes/Repsonse';
import { Product } from './classes/Product';
import { User } from './classes/User';
import { Observable } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';
import { PersonalInfo } from './classes/PersonalInfo';
import { RegistrationRequest } from './classes/RegistrationRequest';
import { ProductRequest } from './classes/ProductRequest';
import { OrderRequest } from './classes/OrderRequest';
@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  constructor(private http: HttpClient) { }
  private backUrl = "https://onlineshop-ekb.herokuapp.com"
  // private backUrl = "http://localhost:5000"

  addProduct(productRequest: ProductRequest, token: String) {
    const myHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set("x-auth-token", token.toString());
    let body = JSON.stringify(productRequest);
    return this.http.post(this.backUrl + '/api/saveProduct',
        body,
        {
          responseType: 'json',
          headers: myHeaders
        }).pipe(map(answer => {
      const res = answer.valueOf() as Response;
      if (res.status == "OK")
        return;
      else {throw new Error("add failed")} 
    }));
  }
  deleteProducts(productsId: Array<Number>, token: String) {
    
    const myHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set("x-auth-token", token.toString());
    let body = JSON.stringify(productsId);
    return this.http.post(this.backUrl + '/api/deleteProduct',
        body,
        {
          responseType: 'json',
          headers: myHeaders
        }).pipe(map(answer => {
      const res = answer.valueOf() as Response;
      if (res.status == "OK")
        return;
      else {throw new Error("delete failed")} 
    }));
  }

  registration(registrationRequest: RegistrationRequest): Observable<User> {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let body = JSON.stringify(registrationRequest);
    let req =
      this.http.post(this.backUrl + '/registration',
        body,
        {
          responseType: 'json',
          headers: myHeaders
        });
    return req.pipe(map(answer => {
      const res = answer.valueOf() as Response;
      const token = this.handleReponse<User>(res);
      return token;
    }));
  }

  createOrder(orderRequest: OrderRequest, token: String): Observable<void> {
    const myHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set("x-auth-token", token.toString());
    let body = JSON.stringify(orderRequest);
    return this.http.post(this.backUrl + '/api/createOrder',
        body,
        {
          responseType: 'json',
          headers: myHeaders
        }).pipe(map(answer => {
      const res = answer.valueOf() as Response;
      if (res.status == "OK")
        return;
      else {throw new Error("creating order failed")} 
    }));
  }

  login(login: string, password: string): Observable<String> {
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
    return req.pipe(map(answer => {
      const res = answer.valueOf() as Response;
      const token = this.handleReponse<String>(res);
      return token;
    }));
  }

  getAllProducts(): Observable<Iterable<Product>> {
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

  getPersonalInfo(token: String): Observable<PersonalInfo> {
    return this.http.get(this.backUrl + "/api/userInfo", { headers: { "x-auth-token": token.toString() } }).pipe(
      map(answer => {
        const res = answer.valueOf() as Response;
        if (res && res.status === 'OK') {
          const personalInfo = res.payload.valueOf() as PersonalInfo;
          return personalInfo;
        } else { throw Error(res.message) }
      })
    )
  }

  private handleReponse<T>(response: Response) {
    if (response && response.status === 'OK') {
      const payload = response.payload.valueOf() as T;
      return payload;
    } else {
      throw Error(response.message);
    }
  }
}
