import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Course_UrlName } from '../course/course.module';
import { Student_UrlName } from '../student/student.module';
import { Teacher_UrlName } from '../teacher/teacher.module';
import { User_UrlName } from '../user/user.module';
import { FormInicialComponent, FormInicialComponent_UrlName } from './components/form-inicial/form-inicial.component';
import { FormularioAccesoNoAutorizadoComponent, FormularioAccesoNoAutorizadoComponent_UrlName } from './components/formulario-acceso-no-autorizado/formulario-acceso-no-autorizado.component';
import { FormularioLoginComponent, FormularioLoginComponent_UrlName } from './components/formulario-login/formulario-login.component';
import { user_isAdministrador_guard, user_isLogged_guard } from './guards/auth.guard';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';


const guards = [user_isLogged_guard, user_isAdministrador_guard];

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:
      [
        { path: FormInicialComponent_UrlName, component: FormInicialComponent },
        { path: FormularioLoginComponent_UrlName, component: FormularioLoginComponent },
        { path: FormularioAccesoNoAutorizadoComponent_UrlName, component: FormularioAccesoNoAutorizadoComponent },


        // { path: Course_UrlName, loadChildren: () => import('../course/course.module').then(m => m.CourseModule) , canActivate:guards},
        // { path: User_UrlName, loadChildren: () => import('../user/user.module').then(m => m.UserModule) , canActivate:guards},
        // { path: Student_UrlName, loadChildren: () => import('../student/student.module').then(m => m.StudentModule)   , canActivate:guards},
        // { path: Teacher_UrlName, loadChildren: () => import('../teacher/teacher.module').then(m => m.TeacherModule) , canActivate:[user_isLogged_guard]},


        { path: '**', redirectTo: FormInicialComponent_UrlName }
      ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainApplicationRoutingModule { }
