import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './classes/User';
import { map, flatMap } from 'rxjs/operators';
import { RegistrationRequest } from './classes/RegistrationRequest';
import { PersonalInfo } from './classes/PersonalInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user: User;
  public token: string;


  constructor(private http: HttpServiceService) { }

  public login(login: string, password: string): Observable<string> {
    return this.http.login(login, password).pipe(flatMap(token => {
      this.token = token;
      this.isUserLoggedIn.next(true)
      return this.http.getPersonalInfo(token).pipe(map(personalInfo => {
        console.log(personalInfo)
        this.user = new User(personalInfo.firstName, personalInfo.secondName, personalInfo.login)
        return token;
      }))
    }));
  }

  public registration(registrationRequest: RegistrationRequest): Observable<User> {
    return this.http.registration(registrationRequest)
  }

  public getPersonalInfo(): Observable<PersonalInfo> {
    if (this.isUserLoggedIn.value) {
      return this.http.getPersonalInfo(this.token)
    } else {
      return;
    }
  }
}
