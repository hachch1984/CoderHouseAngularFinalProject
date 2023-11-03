import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoGeneralComponent, User_ListadoGeneralComponent_UrlName } from './components/listado-general/listado-general.component';
import { ReporteUsuariosPorTipoComponent, User_ReporteUsuariosPorTipoComponent_UrlName } from './components/reporte-usuarios-por-tipo/reporte-usuarios-por-tipo.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: User_ListadoGeneralComponent_UrlName, component: ListadoGeneralComponent },
      { path: User_ReporteUsuariosPorTipoComponent_UrlName, component: ReporteUsuariosPorTipoComponent },
       {path: '**', redirectTo: User_ListadoGeneralComponent_UrlName},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
