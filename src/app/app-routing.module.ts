import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainApplication_UrlName } from './main-application/main-application.module';

const routes: Routes = [

  {
    path: MainApplication_UrlName,
    loadChildren: () => import('./main-application/main-application.module').then(m => m.MainApplicationModule),
  },
  {
    path: '',
    redirectTo: MainApplication_UrlName,
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
