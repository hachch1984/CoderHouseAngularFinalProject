import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module'; 
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { GenerateUrlName } from '../shared/utilCode/Code';
import { ListadoGeneralCursosInscritosComponent } from './components/listado-general-cursos-inscritos/listado-general-cursos-inscritos.component';
import { SharedModule } from '../shared/shared.module';



export const Teacher_UrlName =GenerateUrlName( 'teacher');

@NgModule({
  declarations: [
    MainLayoutComponent,
    ListadoGeneralCursosInscritosComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule, 
    SharedModule,
  ],
  
})
export class TeacherModule { }
