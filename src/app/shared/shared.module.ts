import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModalYesNoComponent } from './componets/form-modal-yes-no/form-modal-yes-no.component';
 
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { PascalCaseWithEndPoint } from './pipes/pascal-case-with-end-point.pipe';
 


@NgModule({
  declarations: [
    FormModalYesNoComponent,
    PascalCaseWithEndPoint, 
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports:[
    PascalCaseWithEndPoint,
    FormModalYesNoComponent,
  ]
})
export class SharedModule { }
