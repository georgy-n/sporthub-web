import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { Category } from '../infrastructure/classes/Category';

@Component({
  selector: 'app-offer-activity',
  templateUrl: './offer-activity.component.html',
  styleUrls: ['./offer-activity.component.css']
})
export class OfferActivityComponent implements OnInit {
  activityOfferForm: FormGroup;
  categories: Array<Category> = []
  cate = "";
  loading: Boolean;
  errors: String;
  constructor( private formBuilder: FormBuilder, private httpClient: HttpServiceService) {
    httpClient.getCategories().subscribe(cat => this.categories = cat)
   }

  ngOnInit() {
    this.activityOfferForm = this.formBuilder.group({
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      countPerson: [0, [Validators.required, Validators.min(0), Validators.min(50)]],
      date: ['', [Validators.required]]

    });
  }

  onSubmit() {
    
      let controls = this.activityOfferForm.controls;
      console.log(controls.subCategory.value);
      console.log(controls.category.value);

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

  updateValue(newV){
    console.log(newV)
  }

  getSubCategories(categoryName: string): Array<String> {
    let value = this.categories.find(elem => elem.name === categoryName)
    if (value === undefined) return []
    else return value.subCategories;
  }
  changeCity(e) {
    console.log(e.target.value)
    console.log(this.categories.find(elem => elem.name === e.target.value).subCategories)
    this.cate = e.target.value;
  }
}
