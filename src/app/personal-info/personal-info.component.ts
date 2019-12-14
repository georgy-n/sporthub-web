import { Component, OnInit } from '@angular/core';
import { PersonalInfo } from 'src/app/infrastructure/classes/PersonalInfo';
import { Router } from '@angular/router';
import { UserService } from 'src/app/infrastructure/user.service';
import { HttpServiceService } from 'src/app/infrastructure/http-service.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  public personalInfo: PersonalInfo = new PersonalInfo();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getPersonalInfo().subscribe((resp: PersonalInfo) => {
      this.personalInfo = resp;
    });
  }

}
