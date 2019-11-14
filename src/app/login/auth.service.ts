import { Injectable } from '@angular/core';
import { HttpServiceService } from '../bank/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth: Boolean = false;
  constructor(private http: HttpServiceService) { }

  public login(login: String, password: String) {
    // get request to backend 
    return this.http.getPassword(login, password);
  }
}
