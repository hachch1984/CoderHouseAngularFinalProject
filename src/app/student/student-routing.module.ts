import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Course_MainLayoutComponent_UrlName, MainLayoutComponent } from './pages/main-layout/main-layout.component';

const routes: Routes = [
{ path: Course_MainLayoutComponent_UrlName, component: MainLayoutComponent },
{path:'',redirectTo:Course_MainLayoutComponent_UrlName,pathMatch:'full'},
{path:'**',redirectTo:Course_MainLayoutComponent_UrlName,pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
