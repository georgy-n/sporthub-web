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
  }

}
