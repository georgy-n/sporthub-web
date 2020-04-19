import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { Response } from '../infrastructure/classes/Repsonse';
import { Activity } from '../infrastructure/classes/ActivityRaw';
import { Router } from '@angular/router';
import { UserService } from '../infrastructure/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Iterable<Activity> = [];
  logged: Boolean = false;

  constructor(
    private httpService: HttpServiceService, 
    private userService: UserService, 
    private router: Router) {
    userService.isUserLoggedIn.subscribe(v => this.logged = v)
   }

  ngOnInit() {
  }
}
