import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoGeneralComponent, ListadoGeneralComponent_UrlName } from './components/listado-general/listado-general.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: ListadoGeneralComponent_UrlName, component: ListadoGeneralComponent },    
       { path: '**', redirectTo: ListadoGeneralComponent_UrlName }
    ]
  }, 
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
