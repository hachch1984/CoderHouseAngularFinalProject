import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';



export const Teacher_UrlName = 'teacher';

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    AngularMaterialModule,
  ],
  
})
export class TeacherModule { }
