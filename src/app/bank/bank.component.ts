import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // this.router.navigate(["bank/payments-pay/by-card"]);
  }

}
