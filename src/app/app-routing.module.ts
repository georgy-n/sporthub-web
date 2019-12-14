import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './home/home.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalInfoGuard } from './guards/personalInfo.guard';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationGuard } from './guards/registration.guard';
import { BucketComponent } from './bucket/bucket.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent, canActivate: [RegistrationGuard]},
  {path: "personalInfo", component: PersonalInfoComponent, canActivate: [PersonalInfoGuard]},
  {path: "admin", component: AdminPanelComponent, canActivate: [AdminGuard]},
  {path: "registration", component: RegistrationComponent, canActivate: [RegistrationGuard]},
  {path: "orderBasket", component: BucketComponent, canActivate: [PersonalInfoGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
