import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpServiceService } from 'src/app/bank/http-service.service';
import { User } from '../../person-info/user';

@Component({
  selector: 'app-payments-request',
  templateUrl: './payments-request.component.html',
  styleUrls: ['./payments-request.component.css']
})
export class PaymentsRequestComponent implements OnInit {
  public person: Object;

  @ViewChild('f') slForm: NgForm;

  private NDS: String = "без НДС";

  constructor(public httpService: HttpServiceService) {
    // httpService.getUser().subscribe((data: User) => this.person = data);
    this.person = {
      name: "Швецова Мария Марияевна",
      company: "Индивидуальный предприниматель",
      site: "www.t.com",
      email: "t@t",
      number: "88888888"
    };
  }

  onSubmit(form: NgForm) {
    var tempForm = form.value;
    tempForm["nds"] = this.NDS;

    this.httpService.addPaymentRequest(tempForm).subscribe(
      (response: any) => { console.log(response); }
    );
    this.onClean(form);
  }

  ngOnInit() { }

  private choseNDS(nds: String): void {
    this.NDS = nds;
  }

  private onClean(form: NgForm) {
    form.reset();
  }
}
