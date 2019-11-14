import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public person: Object;
  constructor() { }

  ngOnInit() {
    this.person = {
      name: "Швецова Мария Марияевна",
      company: "Индивидуальный предприниматель",
      site: "www.t.com",
      email: "t@t"
    };
  }

}
