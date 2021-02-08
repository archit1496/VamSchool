import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HelpComponent } from './help/help.component';
import { ContactusComponent } from './contactus/contactus.component';

import { MaterialModule } from './shared-modules/material.module';
import { HtpInterceptor } from 'src/service/interceptor.service';

import { ToastrModule } from 'ngx-toastr';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { HomeQuoteComponent } from './home-quote/home-quote.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AboutusComponent,
    HelpComponent,
    ContactusComponent,
    HomeHeaderComponent,
    PasswordChangeComponent,
    ForgotPasswordComponent,
    HomeFeaturesComponent,
    WhyUsComponent,
    SubscribeComponent,
    HomeQuoteComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  schemas : [ NO_ERRORS_SCHEMA ],
  providers: [HtpInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
