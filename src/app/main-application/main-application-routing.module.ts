import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { Student_UrlName } from '../student/student.module';
import { Teacher_UrlName } from '../teacher/teacher.module';
import { User_UrlName } from '../user/user.module';
import { FormInicialComponent, FormInicialComponent_UrlName } from './components/form-inicial/form-inicial.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { Course_UrlName } from '../course/course.module';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:
      [
        { path: FormInicialComponent_UrlName, component: FormInicialComponent },

        { path: Course_UrlName, loadChildren: () => import('../course/course.module').then(m => m.CourseModule) ,  },
        { path: User_UrlName, loadChildren: () => import('../user/user.module').then(m => m.UserModule) },
        { path: Student_UrlName, loadChildren: () => import('../student/student.module').then(m => m.StudentModule) },
        { path: Teacher_UrlName, loadChildren: () => import('../teacher/teacher.module').then(m => m.TeacherModule) },
        

        { path: '**', redirectTo: FormInicialComponent_UrlName }
      ]
  },

 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainApplicationRoutingModule { }
