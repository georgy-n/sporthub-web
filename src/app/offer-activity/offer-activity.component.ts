import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-offer-activity',
  templateUrl: './offer-activity.component.html',
  styleUrls: ['./offer-activity.component.css']
})
export class OfferActivityComponent implements OnInit {
  activityOfferForm: FormGroup;

  loading: Boolean;
  errors: String;
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activityOfferForm = this.formBuilder.group({
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      description: ['', Validators.required],
      countPerson: ['', Validators.required],
      date: ['', [Validators.required]]

    });
  }

  onSubmit() {
    // if (this.rForm.invalid) {
    //   this.markFormGroupTouched(this.rForm)
    //   return
    // } else {
    //   this.loading = true
    //   let controls = this.rForm.controls
    //   let regRequest = new RegistrationRequest(
    //     controls.firstName.value,
    //     controls.firstName.value,
    //     controls.login.value,
    //     controls.password.value)
    //   this.authService.registration(regRequest).subscribe(
    //     user => {
    //       this.router.navigate(['/login']);
    //     },
    //     err => {
    //       this.errors = err.message;
    //       this.loading = false;
    //     }
    //   )
    // }
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
