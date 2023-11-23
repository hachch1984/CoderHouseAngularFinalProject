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
import { Store } from '@ngrx/store';
import { selectorCourseState } from 'src/app/store/services/redux/CourseSelector';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { CourseActions } from 'src/app/store/services/redux/CourseAction';



export const MainLayoutComponent_UrlName: string = 'main-layout';

@Component({
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

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
        { title: 'Cusros inscritos', url: Teacher_UrlName, icon: 'school' });

    }
    return menuItems;
  }




  userLogged: UserInterface | undefined = undefined;

  constructor(
    private store: Store, 
    private router: Router) {
    this.store.select(selectorCourseState).subscribe((state) => {
      this.userLogged = state.user;
    });
  }


  user_isLogged() {
    return this.userLogged ? true : false;//   this.courseService.user_isLogged();
  }
  user_logged() {
    return this.userLogged;//.user_logged();
  }


  bnLogin_onClick() { 
    this.store.dispatch(CourseActions.loginClear());
    this.router.navigate([GenerateUrl(MainApplication_UrlName, FormularioLoginComponent_UrlName)]);
  }

  bnLogout_onClick() { 
    this.store.dispatch(CourseActions.logout());
    //this.courseService.user_logout();
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
