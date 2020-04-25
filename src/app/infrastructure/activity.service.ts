import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Category } from './classes/Category';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { OfferActivityRequest } from './classes/OfferActivityRequest';
import { Activity, ActivityInfo } from './classes/ActivityRaw';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  
  constructor(private http: HttpServiceService) {
   }

  getCategories(): Observable<Array<Category>> {
    return this.http.getCategories();
  }

  offerActivity(req: OfferActivityRequest, token: string): Observable<Activity> {
    return this.http.offerActivity(req, token);
  }

  subscribeActivity(activityId: number, token: string): Observable<string> {
    return this.http.subscribeOnActivity(activityId, token);
  }

  activityInfo(activityId: string): Observable<ActivityInfo> {
    return this.http.getActivityInfo(activityId);
  }
}
