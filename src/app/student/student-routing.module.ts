import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoGeneralComponent, Student_ListadoGeneralComponent_UrlName } from './components/listado-general/listado-general.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: Student_ListadoGeneralComponent_UrlName, component: ListadoGeneralComponent },
      { path: '**', redirectTo: Student_ListadoGeneralComponent_UrlName }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
