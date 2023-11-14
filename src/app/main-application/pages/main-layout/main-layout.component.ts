import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course_UrlName } from 'src/app/course/course.module';
import { GenerateUrl } from 'src/app/shared/utilCode/Code';
import { UserTypeEnum } from 'src/app/store/interfaces/UserTypeEnum';
import { CourseService } from 'src/app/store/services/course.service';
import { Student_UrlName } from 'src/app/student/student.module';
import { Teacher_UrlName } from 'src/app/teacher/teacher.module';
import { User_UrlName } from 'src/app/user/user.module';
import { FormularioLoginComponent_UrlName } from '../../components/formulario-login/formulario-login.component';
import { MainApplication_UrlName } from '../../main-application.module';



export const MainLayoutComponent_UrlName: string = 'main-layout';

@Component({
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent  {

  getMenuItems() {
    let menuItems: MenuItem[] = [];
    if (this.user_isLogged()) {

      if (this.user_logged()?.userType === UserTypeEnum.admin) {
         
        menuItems = [
          { title: 'Usuarios', url: User_UrlName, icon: 'manage_accounts' },
          { title: 'Cursos', url: Course_UrlName, icon: 'menu_book' },
          { title: 'Estudiantes', url: Student_UrlName, icon: 'person' },
        ]
      }
      menuItems.push(
        { title: 'Tareas asignadas', url: Teacher_UrlName, icon: 'school' });

    } 
    return menuItems;
  }






  constructor(
    private courseService: CourseService,
    private router: Router) { }
   

  user_isLogged() {
    return this.courseService.user_isLogged();
  }
  user_logged() {
    return this.courseService.user_logged();
  }

  bnLogin_onClick() {
    this.router.navigate([GenerateUrl(MainApplication_UrlName, FormularioLoginComponent_UrlName)]);
  }
  bnLogout_onClick() {
    this.courseService.user_logout();
    this.router.navigate([GenerateUrl(MainApplication_UrlName)]);
  }

  title_onClick() {
    this.router.navigate([GenerateUrl(MainApplication_UrlName)]);
  }


}

interface MenuItem {
  title: string;
  url: string;
  icon: string;
}
