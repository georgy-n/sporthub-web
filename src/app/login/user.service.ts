import { Injectable } from '@angular/core';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { Observable } from 'rxjs';
import { User } from '../infrastructure/User';
import { map, flatMap } from 'rxjs/operators';
import { RegistrationRequest } from '../infrastructure/RegistrationRequest';
import { PersonalInfo } from '../infrastructure/PersonalInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isAuth: Boolean = false;
  public user: User;
  public token: String;


  constructor(private http: HttpServiceService) { }

  public login(login: string, password: string): Observable<String> {
    return this.http.login(login, password).pipe(flatMap(token => {
      this.token = token;
      this.isAuth = true;
      return this.http.getPersonalInfo(token).pipe(map(personalInfo => {
        console.log(personalInfo)
        this.user = new User(personalInfo.firstName, personalInfo.lastName, personalInfo.login, personalInfo.role)
        return token;
      }))
    }));
  }

  public registration(registrationRequest: RegistrationRequest): Observable<User> {
    return this.http.registration(registrationRequest)
  }
}
