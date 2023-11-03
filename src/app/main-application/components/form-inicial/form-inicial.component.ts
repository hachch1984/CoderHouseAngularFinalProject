import { Component } from '@angular/core';
import { GenerateUrlName } from 'src/app/shared/utilCode/Code';

export const FormInicialComponent_UrlName: string =GenerateUrlName( 'main-application-form-inicial');

@Component({
  templateUrl: './form-inicial.component.html',
  styleUrls: ['./form-inicial.component.scss']
})
export class FormInicialComponent {

}
