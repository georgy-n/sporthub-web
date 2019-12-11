import { Component, OnInit } from '@angular/core';
import { PersonalInfo } from 'src/app/infrastructure/PersonalInfo';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login/user.service';
import { HttpServiceService } from 'src/app/infrastructure/http-service.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  public personalInfo: PersonalInfo = new PersonalInfo();

  constructor(private httpService: HttpServiceService, private authService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.authService.isAuth){
      this.httpService.getPersonalInfo(this.authService.token).subscribe((resp: PersonalInfo) => {
        this.personalInfo = resp;
      });
    }
  }

}
