import { Injectable } from '@angular/core';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { Observable } from 'rxjs';
import { User } from '../infrastructure/User';
import { map } from 'rxjs/operators';
import { RegistrationRequest } from '../infrastructure/RegistrationRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth: Boolean = false;
  public user: User;
  public token: String;


  constructor(private http: HttpServiceService) { }

  public login(login: string, password: string): Observable<String> {
    return this.http.login(login, password).pipe(map(token => {
      this.token = token;
      this.isAuth = true;
      return token;
    }));
  }

  public registration(registrationRequest: RegistrationRequest): Observable<User> {
    return this.http.registration(registrationRequest)
  }
}
