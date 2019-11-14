import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})

export class PersonInfoComponent implements OnInit {
  public person: Object;

  constructor(public httpService: HttpServiceService) {}

  ngOnInit() {
    this.person = {
      name: "Швецова Мария Марияевна",
      company: "Индивидуальный предприниматель",
      site: "www.t.com",
      email: "t@t",
      number: "88888888"
    };

    // this.httpService.getUser().subscribe((data: User) => this.person = data);
  }
}
