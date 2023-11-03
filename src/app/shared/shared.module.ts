import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormModalYesNoComponent } from './componets/form-modal-yes-no/form-modal-yes-no.component';
  
import { TitleType01Directive } from './directives/title-type01.directive';
import { PascalCaseWithEndPoint } from './pipes/pascal-case-with-end-point.pipe';
 
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { SpinnerComponent } from './componets/spinner/spinner.component';
 
 
 


@NgModule({
  declarations: [
    FormModalYesNoComponent,
    PascalCaseWithEndPoint,
    TitleType01Directive,
    SpinnerComponent,   
  ],
  imports: [
    RouterModule,
    CommonModule,
     AngularMaterialModule, 
  ],
  exports:[
    RouterModule,
    CommonModule,
    PascalCaseWithEndPoint,
    FormModalYesNoComponent,
    TitleType01Directive,
    AngularMaterialModule,
    SpinnerComponent,  
  ], 
  
})
export class SharedModule { }
