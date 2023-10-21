import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser'; 
import { MainApplicationRoutingModule } from './main-application-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    BrowserModule,      
    MainApplicationRoutingModule,   
    SharedModule,
  ],
  exports: [
    MainApplicationRoutingModule,
    LayoutComponent,
  ]
})
export class MainApplicationModule { }
