import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let toSend = form.value;
    this.authService.login(toSend['login'], toSend['password']).subscribe(
      (resp: any) => {
        if(toSend['password'] == resp) {
          console.log("hello!");
          this.authService.isAuth = true;
          this.route.navigate(["admin"]);
        }
        else {
          console.log("neadmin");
          form.reset();
      }
      }
      );
  }
}
