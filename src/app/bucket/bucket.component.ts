import { Component, OnInit } from '@angular/core';
import { BasketStorageService } from '../infrastructure/basket-storage.service';
import { Product } from '../infrastructure/classes/Product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../infrastructure/user.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {

  orderForm: FormGroup;
  basket: Array<Product> = []
  countProduct: {[key: string]: Number} = {}

  constructor(
    private userService: UserService,
    private basketStorage: BasketStorageService,
    private formBuilder: FormBuilder) {
    this.basketStorage.basket.subscribe(value => this.basket = value)
    this.basketStorage.countProduct.subscribe(v => this.countProduct = v)
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  clean() {
    this.basketStorage.clean()
  }
  order() {
    if (this.orderForm.invalid) {
      return;
    }

    let controls = this.orderForm.controls
    this.basketStorage.createOrder(controls.email.value, this.basket, this.userService.token).subscribe(
      v => {
        this.basketStorage.clean()
      },
      err => {
      }
    )
  }
}
