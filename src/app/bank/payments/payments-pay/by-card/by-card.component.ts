import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/bank/http-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-by-card',
  templateUrl: './by-card.component.html',
  styleUrls: ['./by-card.component.css']
})
export class ByCardComponent implements OnInit {

  constructor(public httpService: HttpServiceService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    var paymentCard = form.value;
    console.log(paymentCard);
    this.httpService.addPaymentCard(paymentCard).subscribe(
      (response: any) => { console.log(response); }
    );
    form.reset();
  }

}
