import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { MainApplicationModule } from './main-application/main-application.module';
import { FormModalYesNoComponent } from './shared/componets/form-modal-yes-no/form-modal-yes-no.component';

@NgModule({
  declarations: [
    AppComponent,
    FormModalYesNoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MainApplicationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
