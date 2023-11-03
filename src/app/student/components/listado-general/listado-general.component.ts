import { Component } from '@angular/core';
import { GenerateUrlName } from 'src/app/shared/utilCode/Code';



export const ListadoGeneralComponent_UrlName: string = GenerateUrlName ('listado-general');

@Component({ 
  templateUrl: './listado-general.component.html',
  styleUrls: ['./listado-general.component.scss']
})
export class ListadoGeneralComponent {

}
