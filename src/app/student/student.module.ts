import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GenerateUrlName } from '../shared/utilCode/Code';
import { FormularioInsertarActualizarComponent } from './components/formulario-insertar-actualizar/formulario-insertar-actualizar.component';
import { ListadoGeneralComponent } from './components/listado-general/listado-general.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { StudentRoutingModule } from './student-routing.module';

export const Student_UrlName =GenerateUrlName( 'student');

@NgModule({
  declarations: [
    MainLayoutComponent,
    ListadoGeneralComponent,
    FormularioInsertarActualizarComponent
  ],
  imports: [ 
    StudentRoutingModule, 
    SharedModule,
  ]
})
export class StudentModule { }
