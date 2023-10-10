import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainApplicationRoutingModule } from './main-application-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { BrowserModule } from '@angular/platform-browser';


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
