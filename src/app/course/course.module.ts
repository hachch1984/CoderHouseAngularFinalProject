import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { ReportAgrupadoPorTipoComponent } from './pages/report-agrupado-por-tipo/report-agrupado-por-tipo.component';
import { FormularioInsertarActualizarComponent } from './components/formulario-insertar-actualizar/formulario-insertar-actualizar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export const Course_UrlName='course';


@NgModule({
  declarations: [
    MainLayoutComponent,
    ReportAgrupadoPorTipoComponent,
    FormularioInsertarActualizarComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CourseModule { }
