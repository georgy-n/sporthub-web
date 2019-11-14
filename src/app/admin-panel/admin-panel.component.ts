import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  private payments: Iterable<Object>;
  private requests: Iterable<Object>;

  constructor(private http: HttpServiceService) { }

  ngOnInit() {
    this.http.getPayments().subscribe((resp: Iterable<Object>) => this.payments = resp);
    this.http.getRequests().subscribe((resp: Iterable<Object>) => this.requests = resp);
  }

  deletePayment(form: NgForm) {
      this.http.deletePayments(form.value['id']).subscribe((resp: any) => this.ngOnInit());
  }

  submitRequest(form: NgForm) {
    this.http.filterRequest(form.value['filter'], form.value['field'], form.value['sort'])
    .subscribe((resp: Iterable<Object>) => this.requests = resp)
  }

}
