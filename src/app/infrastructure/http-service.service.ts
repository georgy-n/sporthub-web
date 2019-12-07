import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Response } from '../infrastructure/Repsonse';
import { Product } from './Product';
import { User } from './User';
import { Observable } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';
import { PersonalInfo } from './PersonalInfo';
@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  constructor(private http: HttpClient) { }
  private backUrl = "https://onlineshop-ekb.herokuapp.com"
  // private backUrl = "http://localhost:5000"

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

  getPersonalInfo(token: String) {
    return this.http.get(this.backUrl + "/api/userInfo", {headers:{"x-auth-token": token.toString()}}).pipe(
      map(answer => {
        console.log(answer)
        const res = answer.valueOf() as Response;
        if (res && res.status === 'OK') {
          const products = res.payload.valueOf() as PersonalInfo;
          return products;
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
