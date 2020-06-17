import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../infrastructure/user.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
    if (this.authService.isUserLoggedIn.value) {
      return true;
    } else {
      console.log(state.url)
      this.router.navigate(['login'], { 
        queryParams: { 
          return: state.url 
        }
      });
    }
  }
}
