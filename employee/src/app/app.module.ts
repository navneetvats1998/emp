import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './material-component.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FontAwesomeModule,
    // NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
