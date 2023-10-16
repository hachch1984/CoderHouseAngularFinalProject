import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { MainApplicationRoutingModule } from './main-application-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    BrowserModule,     
    AngularMaterialModule,
    MainApplicationRoutingModule,   
  ],
  exports: [
    MainApplicationRoutingModule,
    LayoutComponent,
  ]
})
export class MainApplicationModule { }
