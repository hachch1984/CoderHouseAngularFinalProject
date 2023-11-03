import { Component } from '@angular/core';
import { GenerateUrlName } from 'src/app/shared/utilCode/Code';

export const FormNoExisteComponent_UrlName: string =GenerateUrlName( 'main-application-form-no-existe');


@Component({
  templateUrl: './form-no-existe.component.html',
  styleUrls: ['./form-no-existe.component.scss']
})
export class FormNoExisteComponent {

}
