import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoGeneralCursosInscritosComponent, Teacher_ListadoGeneralCursosInscritosComponent_UrlName } from './components/listado-general-cursos-inscritos/listado-general-cursos-inscritos.component';
import { MainLayoutComponent, Teacher_MainLayoutComponent_UrlName } from './pages/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '', 
    component: MainLayoutComponent,
    children: [
      { path: Teacher_ListadoGeneralCursosInscritosComponent_UrlName, component:ListadoGeneralCursosInscritosComponent }, 
      { path: '**', redirectTo: Teacher_ListadoGeneralCursosInscritosComponent_UrlName}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
