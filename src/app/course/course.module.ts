import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module'; 
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { ReportAgrupadoPorTipoComponent } from './components/report-agrupado-por-tipo/report-agrupado-por-tipo.component';
import { FormularioInsertarActualizarComponent } from './components/formulario-insertar-actualizar/formulario-insertar-actualizar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoGeneralComponent } from './components/listado-general/listado-general.component';
import { SharedModule } from '../shared/shared.module';
import { GenerateUrlName } from '../shared/utilCode/Code';


export const Course_UrlName=  GenerateUrlName( 'course');


@NgModule({
  declarations: [
    MainLayoutComponent,
    ReportAgrupadoPorTipoComponent,
    FormularioInsertarActualizarComponent,
    ListadoGeneralComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class CourseModule { }
