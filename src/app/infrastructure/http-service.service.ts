import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Response } from './classes/Repsonse';
import { Activity, ActivityRaw, ActivityInfo, ActivityInfoRaw } from './classes/ActivityRaw';
import { User } from './classes/User';
import { Observable } from 'rxjs';
import { PersonalInfo, ShortPersonalInfo } from './classes/PersonalInfo';
import { RegistrationRequest } from './classes/RegistrationRequest';
import { LoginResponse } from './classes/LoginResponse';
import { ErrorResponse } from './classes/ErrorRepsonse';
import { ComponentSource } from 'ag-grid-community/dist/lib/components/framework/userComponentFactory';
import { Category } from './classes/Category';
import { OfferActivityRequest } from './classes/OfferActivityRequest';
@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  constructor(private http: HttpClient) { }
  private backUrl = "https://sport-hub-ekb.herokuapp.com"
  // private backUrl = "http://localhost:5000"

  offerActivity(req: OfferActivityRequest, token: String) {
    const myHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set("Authorization", "Bearer " + token.toString());
    let body = JSON.stringify(req);
    return this.http.post(this.backUrl + '/activity/addActivityOffer',
        body,
        {
          responseType: 'json',
          headers: myHeaders
        }).pipe(map(answer => {
      const res = answer.valueOf() as Response;
      const act = this.handleReponse<ActivityRaw>(res);
      let d = new Date(0);
      d.setUTCSeconds(act.date.seconds);  
      return new Activity(act.id, act.description, act.category, act.subCategory, 
                          act.owner, act.countPerson, act.status, d);
    }));
  }
  
  getSubscribedActivity(token: string): Observable<Array<Activity>> {
    return this.http.get(this.backUrl + "/activity/subscribed",
    { headers: { "Authorization": "Bearer " + token.toString() }}
    ).pipe(
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

  login(login: string, password: string): Observable<string> {
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

  getShortPersonalInfo(userId: string): Observable<ShortPersonalInfo> {
    return this.http.get(this.backUrl + "/user/shortPersonalInfo?userId=" + userId)
      .pipe(
        map(answer => {
          const res = answer.valueOf() as Response;
          const response = this.handleReponse<ShortPersonalInfo>(res);
          return response;
        })
    )
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

  getCategories(): Observable<Array<Category>> {
    return this.http.get(
      this.backUrl + "/activity/getCategories")
      .pipe(
        map(answer => {
          const res = answer.valueOf() as Response;
          const response = this.handleReponse<Array<Category>>(res);
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

  subscribeOnActivity(activityId: number, token: String): Observable<string> {
    const myHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set("Authorization", "Bearer " + token.toString());
    const params = new HttpParams().append("activityId", activityId.toString());
    return this.http.post(this.backUrl + '/activity/subscribe',
        null,
        {
          responseType: 'json',
          headers: myHeaders,
          params: params
        }).pipe(map(answer => {
      const res = answer.valueOf() as Response;
      const any = this.handleReponse<Object>(res);
      return "ok";
    }));
  }

  unSubscribeOnActivity(activityId: number, token: String): Observable<string> {
    const myHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set("Authorization", "Bearer " + token.toString());
    const params = new HttpParams().append("activityId", activityId.toString());
    return this.http.post(this.backUrl + '/activity/unSubscribe',
        null,
        {
          responseType: 'json',
          headers: myHeaders,
          params: params
        }).pipe(map(answer => {
      const res = answer.valueOf() as Response;
      const any = this.handleReponse<Object>(res);
      return "ok";
    }));
  }

  getsubscribedActivities(token: string): Observable<Iterable<Activity>> {
    const myHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set("Authorization", "Bearer " + token.toString());
    return this.http.get(
      this.backUrl + "/activity/subscribed", 
      {responseType:"json", headers: myHeaders})
      .pipe(
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

  getActivityInfo(activityId: string): Observable<ActivityInfo> {
    return this.http.get(
      this.backUrl + "/activity/activityInfo?activityId=" + activityId)
      .pipe(
        map(
          answer => {
            const res = answer.valueOf() as Response;
            const activityR = this.handleReponse<ActivityInfoRaw>(res);
            let d = new Date(0);
            d.setUTCSeconds(activityR.date.seconds);  
            return new ActivityInfo(activityR.id, activityR.description, activityR.category, 
                                    activityR.subCategory, activityR.owner, activityR.countPerson, 
                                    activityR.status, d,
                                    activityR.countFreeSpace, activityR.participants);              
            }
          )
          )
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
