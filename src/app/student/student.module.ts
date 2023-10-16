import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

export const Student_UrlName = 'student';

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    AngularMaterialModule
  ]
})
export class StudentModule { }
