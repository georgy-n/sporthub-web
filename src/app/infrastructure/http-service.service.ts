import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Response } from './classes/Repsonse';
import { Activity, ActivityRaw } from './classes/ActivityRaw';
import { User } from './classes/User';
import { Observable } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';
import { PersonalInfo } from './classes/PersonalInfo';
import { RegistrationRequest } from './classes/RegistrationRequest';
import { ProductRequest } from './classes/ProductRequest';
import { OrderRequest } from './classes/OrderRequest';
import { LoginResponse } from './classes/LoginResponse';
import { ErrorResponse } from './classes/ErrorRepsonse';
import { ComponentSource } from 'ag-grid-community/dist/lib/components/framework/userComponentFactory';
@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  constructor(private http: HttpClient) { }
  private backUrl = "https://sport-hub-ekb.herokuapp.com"
  // private backUrl = "http://localhost:5000"

  // addProduct(productRequest: ProductRequest, token: String) {
  //   const myHeaders = new HttpHeaders()
  //   .set('Content-Type', 'application/json')
  //   .set("x-auth-token", token.toString());
  //   let body = JSON.stringify(productRequest);
  //   return this.http.post(this.backUrl + '/api/saveProduct',
  //       body,
  //       {
  //         responseType: 'json',
  //         headers: myHeaders
  //       }).pipe(map(answer => {
  //     const res = answer.valueOf() as Response;
  //     if (res.status == "OK")
  //       return;
  //     else {throw new Error("add failed")} 
  //   }));
  // }
  // deleteProducts(productsId: Array<Number>, token: String) {
    
  //   const myHeaders = new HttpHeaders()
  //   .set('Content-Type', 'application/json')
  //   .set("x-auth-token", token.toString());
  //   let body = JSON.stringify(productsId);
  //   return this.http.post(this.backUrl + '/api/deleteProduct',
  //       body,
  //       {
  //         responseType: 'json',
  //         headers: myHeaders
  //       }).pipe(map(answer => {
  //     const res = answer.valueOf() as Response;
  //     if (res.status == "OK")
  //       return;
  //     else {throw new Error("delete failed")} 
  //   }));
  // }


  // createOrder(orderRequest: OrderRequest, token: String): Observable<void> {
  //   const myHeaders = new HttpHeaders()
  //   .set('Content-Type', 'application/json')
  //   .set("x-auth-token", token.toString());
  //   let body = JSON.stringify(orderRequest);
  //   return this.http.post(this.backUrl + '/api/createOrder',
  //       body,
  //       {
  //         responseType: 'json',
  //         headers: myHeaders
  //       }).pipe(map(answer => {
  //     const res = answer.valueOf() as Response;
  //     if (res.status == "OK")
  //       return;
  //     else {throw new Error("creating order failed")} 
  //   }));
  // }

  
  getAllActivity(): Observable<Iterable<Activity>> {
    return this.http.get(this.backUrl + "/activity/getAll").pipe(
      map(answer => {
        const res = answer.valueOf() as Response;
        const activitiesR = this.handleReponse<Array<ActivityRaw>>(res);
        let activities = Array<Activity>();
        activitiesR.map((act, b, c) => {
          let d = new Date(0);
          d.setUTCSeconds(act.date.seconds);  
          activities.push(new Activity(act.id, act.description, act.category, act.subCategory, act.owner, act.countPerson, act.status, d));
        });
        return activities;
      })
    );
  }

  login(login: string, password: string): Observable<String> {
    const myHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json');
    let body = JSON.stringify({
      login: login,
      password: password
    });
    let req =
      this.http.post(this.backUrl + '/user/login',
        body,
        {
          responseType: 'json',
          headers: myHeaders
        });
    return req.pipe(map(answer => {
      const res = answer.valueOf() as Response;
      const response = this.handleReponse<LoginResponse>(res);
      return response.session;
    }));
  }

  getPersonalInfo(token: String): Observable<PersonalInfo> {
    return this.http.get(
      this.backUrl + "/user/personalInfo", 
      { headers: { "Authorization": "Bearer " + token.toString() } })
      .pipe(
        map(answer => {
          const res = answer.valueOf() as Response;
          const response = this.handleReponse<PersonalInfo>(res);
          return response;
        })
    )
  }

  
  registration(registrationRequest: RegistrationRequest): Observable<User> {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let body = JSON.stringify(registrationRequest);
    let req =
      this.http.post(this.backUrl + '/user/registration',
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

  private handleReponse<T>(response: Response) {
    if (response && response.status === 'Ok') {
      const payload = response.payload.valueOf() as T;
      return payload;
    } else {
      const errorResponse = response.payload.valueOf() as ErrorResponse;
      throw Error(errorResponse.message);
    }
  }
}
