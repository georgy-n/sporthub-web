import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Category } from './classes/Category';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { OfferActivityRequest } from './classes/OfferActivityRequest';
import { Activity, ActivityInfo } from './classes/ActivityRaw';
import { CommentRaw, Comment } from './classes/Comment';
import { CommentRequest } from './classes/CommentRequest';
import { EditActivityRequest } from './classes/EditActivityRequest';
import { DeleteActivityRequest } from './classes/DeleteActivityRequest';

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

  
  unSubscribeActivity(activityId: number, token: string): Observable<string> {
    return this.http.unSubscribeOnActivity(activityId, token);
  }

  activityInfo(activityId: string): Observable<ActivityInfo> {
    return this.http.getActivityInfo(activityId);
  }

  getSubscibedActivity(token: string): Observable<Array<Activity>> {
    return this.http.getSubscribedActivity(token);
  
  }

  getComments(activityId: number): Observable<Array<Comment>> {
    return this.http.getComments(activityId);

  }

  addComment(req: CommentRequest, token: string): Observable<Comment> {
    return this.http.addComment(req, token);
  }

  editActivity(req: EditActivityRequest,  token: string): Observable<string> {
    return this.http.editActivity(req, token)
  }

  deleteActivity(req: DeleteActivityRequest, token: string): Observable<string> {
    return this.http.deleteActivity(req, token)
  }
}
