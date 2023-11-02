import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { ListadoGeneralComponent } from './components/listado-general/listado-general.component'; 
import { SharedModule } from '../shared/shared.module';
import { FormularioInsertarActualizarComponent } from './components/formulario-insertar-actualizar/formulario-insertar-actualizar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReporteUsuariosPorTipoComponent } from './components/reporte-usuarios-por-tipo/reporte-usuarios-por-tipo.component';
import { VisualizadorFotografiaComponent } from './components/visualizador-fotografia/visualizador-fotografia.component';
import { UserTableComponent } from './components/reporte-usuarios-por-tipo/user-table/user-table.component';

export const User_UrlName='user';

@NgModule({
  declarations: [   
    MainLayoutComponent, ListadoGeneralComponent, FormularioInsertarActualizarComponent, ReporteUsuariosPorTipoComponent, VisualizadorFotografiaComponent, UserTableComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
