import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './admin.guard';
import { HomeComponent } from './home/home.component';
import { PersonalInfoComponent } from './home/personal-info/personal-info.component';
import { PersonalInfoGuard } from './personalInfo.guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "personalInfo", component: PersonalInfoComponent, canActivate: [PersonalInfoGuard]},
  {path: "admin", component: AdminPanelComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
