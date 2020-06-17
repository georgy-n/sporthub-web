import { UserService } from '../infrastructure/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, first, map, timeout } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error: string;

  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private authService: UserService,
    private router: Router,
    private formBuilder: FormBuilder) {}

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['return'] || '/'
    console.log( this.route.snapshot.queryParams['return'])
  }

  onSubmit() {
    console.log("login")
    this.error = null;
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value )
      .subscribe( token => {
          this.router.navigateByUrl(this.returnUrl);
        },
        err => {
          this.error = err.message;
          this.loading = false;
        }
      );
  }
}
