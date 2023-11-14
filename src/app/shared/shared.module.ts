import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormModalYesNoComponent } from './componets/form-modal-yes-no/form-modal-yes-no.component';
  
import { TitleType01Directive } from './directives/title-type01.directive';
import { PascalCaseWithEndPoint } from './pipes/pascal-case-with-end-point.pipe';
 
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material/angular-material.module';
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { VisualizadorFotografiaComponent } from './componets/visualizador-fotografia/visualizador-fotografia.component';
import { SnackbarErrorComponent } from './componets/snackbar-error/snackbar-error.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerPrincipalComponent } from './componets/spinner-principal/spinner-principal.component';
 
 
 


@NgModule({
  declarations: [
    FormModalYesNoComponent,
    PascalCaseWithEndPoint,
    TitleType01Directive,
      
    VisualizadorFotografiaComponent, SnackbarErrorComponent, SpinnerPrincipalComponent,
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
     
    VisualizadorFotografiaComponent,
    FormsModule,
    SnackbarErrorComponent,
    HttpClientModule,
    ReactiveFormsModule,
    SpinnerPrincipalComponent,
  ], 
  
})
export class SharedModule { }
