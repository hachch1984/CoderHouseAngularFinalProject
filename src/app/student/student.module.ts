import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module'; 
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';

export const Student_UrlName = 'student';

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule, 
    SharedModule,
  ]
})
export class StudentModule { }
