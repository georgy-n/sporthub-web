import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsRequestComponent } from './bank/payments/payments-request/payments-request.component';
import {ByCardComponent} from './bank/payments/payments-pay/by-card/by-card.component';
import {ByInternetBankComponent} from './bank/payments/payments-pay/by-internet-bank/by-internet-bank.component'
import { LoginComponent } from './login/login.component';
import { BankComponent } from './bank/bank.component';
import { PaymentsPayComponent } from './bank/payments/payments-pay/payments-pay.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {path:"", redirectTo: 'bank/payments-pay/by-card', pathMatch: "full"},
  {path: "bank/payments-pay", redirectTo: "bank/payments-pay/by-card", pathMatch: "full"},
  { path: 'bank', component: BankComponent, children: [
    { path: 'payments-request', component: PaymentsRequestComponent },
    { path: 'payments-pay', component: PaymentsPayComponent, children: [
            { path: 'by-card', component: ByCardComponent },
            { path: 'by-internet-bank', component: ByInternetBankComponent }
        ]}]},
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminPanelComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
