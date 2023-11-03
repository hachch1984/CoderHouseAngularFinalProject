import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module'; 
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ListadoGeneralComponent } from './components/listado-general/listado-general.component';
import { FormularioInsertarActualizarComponent } from './components/formulario-insertar-actualizar/formulario-insertar-actualizar.component';
import { GenerateUrlName } from '../shared/utilCode/Code';

export const Student_UrlName =GenerateUrlName( 'student');

@NgModule({
  declarations: [
    MainLayoutComponent,
    ListadoGeneralComponent,
    FormularioInsertarActualizarComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule, 
    SharedModule,
  ]
})
export class StudentModule { }
