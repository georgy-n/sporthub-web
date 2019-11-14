import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonInfoComponent } from './bank/person-info/person-info.component';
import { PaymentsComponent } from './bank/payments/payments.component';
import { PaymentsOptionComponent } from './bank/payments/payments-option/payments-option.component';
import { PaymentsRequestComponent } from './bank/payments/payments-request/payments-request.component';
import { FormsModule } from '@angular/forms';
import { PaymentsPayComponent } from './bank/payments/payments-pay/payments-pay.component';
import { ByCardComponent } from './bank/payments/payments-pay/by-card/by-card.component';
import { ByInternetBankComponent } from './bank/payments/payments-pay/by-internet-bank/by-internet-bank.component';
import { OptionsComponent } from './bank/payments/payments-pay/options/options.component';
import { FooterComponent } from './bank/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { BankComponent } from './bank/bank.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonInfoComponent,
    PaymentsComponent,
    PaymentsOptionComponent,
    PaymentsRequestComponent,
    PaymentsPayComponent,
    ByCardComponent,
    ByInternetBankComponent,
    OptionsComponent,
    FooterComponent,
    LoginComponent,
    BankComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
