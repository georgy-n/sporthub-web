import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { MyLoggerMonitor } from '../app.logger.monitor';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  constructor(private http: HttpClient){ }

  deletePayments(id) {
    let a = this.http.patch("http://localhost:5000/bank/admin/cardpayments/" + id, id);
    console.log(a);
    return a;
  }

  getPayments() { 
    return this.http.get("http://localhost:5000/bank/admin/allPayments");
  }

  getRequests(){
    return this.http.get("http://localhost:5000/bank/admin/allRequests");
  }

  filterRequest(filter, field, sort) {
    let query = "filter=" + filter +"&" + "sort=" + sort + "&" + "field=" + field 
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
