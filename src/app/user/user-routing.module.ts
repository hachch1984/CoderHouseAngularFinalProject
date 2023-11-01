import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent, User_MainLayoutComponent_UrlName } from './pages/main-layout/main-layout.component';
import { ListadoGeneralComponent, ListadoGeneralComponent_UrlName } from './components/listado-general/listado-general.component';
import { ReporteUsuariosPorTipoComponent, ReporteUsuariosPorTipoComponent_UrlName } from './components/reporte-usuarios-por-tipo/reporte-usuarios-por-tipo.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: ListadoGeneralComponent_UrlName, component: ListadoGeneralComponent },
      { path: ReporteUsuariosPorTipoComponent_UrlName, component: ReporteUsuariosPorTipoComponent },
      { path: '**', redirectTo: ListadoGeneralComponent_UrlName },
    ]
  },
  { path: '', redirectTo: User_MainLayoutComponent_UrlName, pathMatch: 'full' },
  { path: '**', redirectTo: User_MainLayoutComponent_UrlName }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
