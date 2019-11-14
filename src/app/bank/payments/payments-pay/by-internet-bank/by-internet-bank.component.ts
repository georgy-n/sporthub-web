import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/bank/http-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-by-internet-bank',
  templateUrl: './by-internet-bank.component.html',
  styleUrls: ['./by-internet-bank.component.css']
})
export class ByInternetBankComponent implements OnInit {

  constructor(public httpService: HttpServiceService) { }
  private NDS: String = "без НДС";

  ngOnInit() {
  }

  private choseNDS(nds: String) {
    this.NDS = nds;
  }

  onSubmit(form: NgForm) {
    var paymentBank = form.value;
    paymentBank["nds"] = this.NDS;

    console.log(paymentBank);
    this.httpService.addPaymentBank(paymentBank).subscribe(
      (response: any) => { console.log(response); }
    );
    form.reset();
  }

  onClear(form: NgForm) {
    form.reset();
  }
}
