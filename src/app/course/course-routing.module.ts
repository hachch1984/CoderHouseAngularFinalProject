import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Course_ListadoGeneralComponent_UrlName, ListadoGeneralComponent } from './components/listado-general/listado-general.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { Course_ReportAgrupadoPorTipoComponent_UrlName, ReportAgrupadoPorTipoComponent } from './components/report-agrupado-por-tipo/report-agrupado-por-tipo.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: Course_ListadoGeneralComponent_UrlName, component: ListadoGeneralComponent },
      { path: Course_ReportAgrupadoPorTipoComponent_UrlName, component: ReportAgrupadoPorTipoComponent },
      { path: '**', redirectTo: Course_ListadoGeneralComponent_UrlName },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
