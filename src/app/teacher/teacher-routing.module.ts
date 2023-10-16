import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent, Teacher_MainLayoutComponent_UrlName } from './pages/main-layout/main-layout.component';

const routes: Routes = [
  { path: Teacher_MainLayoutComponent_UrlName, component: MainLayoutComponent },
  { path: '', redirectTo: Teacher_MainLayoutComponent_UrlName, pathMatch: 'full' },
  { path: '**', redirectTo: Teacher_MainLayoutComponent_UrlName, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
