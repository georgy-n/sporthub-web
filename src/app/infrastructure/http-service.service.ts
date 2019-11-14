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
  private backUrl = "http://192.168.1.36:8080"

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

  deletePayments(id) {
    let a = this.http.patch("http://localhost:5000/bank/admin/cardpayments/" + id, id);
    console.log(a);
    return a;
  }

  getPayments() {
    return this.http.get("http://localhost:5000/bank/admin/allPayments");
  }

  getRequests() {
    return this.http.get("http://localhost:5000/bank/admin/allRequests");
  }

  filterRequest(filter, field, sort) {
    let query = "filter=" + filter + "&" + "sort=" + sort + "&" + "field=" + field
    return this.http.get('http://localhost:5000/bank/admin/allRequests?' + query);

  }

  getPassword(login: String, password: String) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let body = JSON.stringify({
      login: login,
      password: password
    });

    let req =
      this.http.post('http://localhost:5000/bank/admin/login',
        body,
        {
          responseType: 'json',
          headers: myHeaders
        });
    return req;
  }
  getUser() {
    return this.http.get('http://localhost:5000/bank/user');
  }

  addPaymentRequest(payment: Object) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(
      "http://localhost:5000/bank/pay-request",
      JSON.stringify(payment),
      {
        responseType: 'json',
        headers: myHeaders
      });
  }

  addPaymentCard(payment: Object) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(
      "http://localhost:5000/bank/pay-card",
      JSON.stringify(payment),
      {
        responseType: 'json',
        headers: myHeaders
      });
  }

  addPaymentBank(payment: Object) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(
      "http://localhost:5000/bank/pay-bank",
      JSON.stringify(payment),
      {
        responseType: 'json',
        headers: myHeaders
      });
  }
}
