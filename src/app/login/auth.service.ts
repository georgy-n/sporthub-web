import { Injectable } from '@angular/core';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth: Boolean = false;
  constructor(private http: HttpServiceService) { }

  public login(login: string, password: string) {
    // get request to backend 
    return this.http.login(login, password);
  }
}
