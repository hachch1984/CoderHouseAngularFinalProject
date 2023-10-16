import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Course_UrlName } from './course/course.module';
import { Student_UrlName } from './student/student.module';
import { Teacher_UrlName } from './teacher/teacher.module';

const routes: Routes = [

  { path: Course_UrlName, loadChildren: () => import('./course/course.module').then(m => m.CourseModule) },
  { path: Student_UrlName, loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: Teacher_UrlName, loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
