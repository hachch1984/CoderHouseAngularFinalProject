import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent, Teacher_MainLayoutComponent_UrlName } from './pages/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '', 
    component: MainLayoutComponent,
    children: [
      { path: Teacher_MainLayoutComponent_UrlName, component:MainLayoutComponent }, 
      { path: '**', redirectTo: Teacher_MainLayoutComponent_UrlName}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
