import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './home/home.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalInfoGuard } from './guards/personalInfo.guard';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationGuard } from './guards/registration.guard';
import { SearchActivityComponent } from './search-activity/search-activity.component';
import { OfferActivityComponent } from './offer-activity/offer-activity.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent, canActivate: [RegistrationGuard]},
  {path: "personalInfo", component: PersonalInfoComponent, canActivate: [PersonalInfoGuard]},
  {path: "registration", component: RegistrationComponent, canActivate: [RegistrationGuard]},
  {path: "search-activity", component: SearchActivityComponent},
  {path: "offer-activity", component: OfferActivityComponent, canActivate: [PersonalInfoGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
