import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { Category } from '../infrastructure/classes/Category';
import { ActivityService } from '../infrastructure/activity.service';
import { OfferActivityRequest } from '../infrastructure/classes/OfferActivityRequest';
import { UserService } from '../infrastructure/user.service';
import { Activity } from '../infrastructure/classes/ActivityRaw';

@Component({
  selector: 'app-offer-activity',
  templateUrl: './offer-activity.component.html',
  styleUrls: ['./offer-activity.component.css']
})
export class OfferActivityComponent implements OnInit {
  activityOfferForm: FormGroup;
  categories: Array<Category> = []
  selectedCategory = "";
  loading: Boolean;
  errors: String;
  success: Boolean;
  createdActivity: Activity;
  
  constructor( private formBuilder: FormBuilder, private activityService: ActivityService, private userService: UserService) {
    activityService.getCategories().subscribe(cat => this.categories = cat)
   }

  ngOnInit() {
    this.activityOfferForm = this.formBuilder.group({
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      countPerson: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      date: ['', [Validators.required]]

    });
  }

  onSubmit() {
    console.log(this.activityOfferForm.controls['countPerson'].invalid)
    if (this.activityOfferForm.invalid) {
      this.markFormGroupTouched(this.activityOfferForm)
      return
    } else {
      this.loading = true
      let controls = this.activityOfferForm.controls
      let regRequest = new OfferActivityRequest(
        controls.category.value,
        controls.subCategory.value,
        controls.description.value,
        controls.countPerson.value,
        controls.date.value)
      this.success = false;

      this.activityService.offerActivity(regRequest, this.userService.token).subscribe(
        act => {
          this.loading = false;
          this.success = true;
          this.createdActivity = act;
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
    this.selectedCategory = e.target.value;
  }
}
