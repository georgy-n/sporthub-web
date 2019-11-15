import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private http: HttpServiceService) { }

  ngOnInit() {
  }

}
