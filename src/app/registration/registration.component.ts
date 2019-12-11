import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../login/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationRequest } from '../infrastructure/RegistrationRequest';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  rForm: FormGroup;
  loading: Boolean;
  errors: String;

  constructor(private authService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.rForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]

    });
  }

  onSubmit() {
    if (this.rForm.invalid) {
      this.markFormGroupTouched(this.rForm)
      return
    } else {
      this.loading = true
      let controls = this.rForm.controls
      let regRequest = new RegistrationRequest(
        controls.firstName.value,
        controls.firstName.value,
        controls.login.value,
        controls.password.value)
      this.authService.registration(regRequest).subscribe(
        user => {
          this.router.navigate(['/login']);
        },
        err => {
          this.errors = err.message;
          this.loading = false;
        }
      )
    }
  }

  private markFormGroupTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
