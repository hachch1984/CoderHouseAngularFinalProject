import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GenerateUrlName } from '../shared/utilCode/Code';
import { FormularioInsertarActualizarComponent } from './components/formulario-insertar-actualizar/formulario-insertar-actualizar.component';
import { ListadoGeneralComponent } from './components/listado-general/listado-general.component';
import { ReporteUsuariosPorTipoComponent } from './components/reporte-usuarios-por-tipo/reporte-usuarios-por-tipo.component';
import { UserTableComponent } from './components/reporte-usuarios-por-tipo/user-table/user-table.component'; 
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { UserRoutingModule } from './user-routing.module';
import { FormularioBusquedaComponent } from './components/formulario-busqueda/formulario-busqueda.component';

export const User_UrlName= GenerateUrlName( 'user');

@NgModule({
  declarations: [   
    MainLayoutComponent, ListadoGeneralComponent, FormularioInsertarActualizarComponent,
     ReporteUsuariosPorTipoComponent,  UserTableComponent, FormularioBusquedaComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
