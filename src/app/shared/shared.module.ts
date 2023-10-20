import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModalYesNoComponent } from './componets/form-modal-yes-no/form-modal-yes-no.component';
 
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { PascalCaseWithEndPoint } from './pipes/pascal-case-with-end-point.pipe';
import { TitleType01Directive } from './directives/title-type01.directive';
import { AppComponent } from '../app.component';
 


@NgModule({
  declarations: [
    FormModalYesNoComponent,
    PascalCaseWithEndPoint,
    TitleType01Directive, 
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports:[
    PascalCaseWithEndPoint,
    FormModalYesNoComponent,
    TitleType01Directive,
  ], 
})
export class SharedModule { }
