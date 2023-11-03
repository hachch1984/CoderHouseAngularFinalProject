import { Component } from '@angular/core';
import { Course_UrlName } from 'src/app/course/course.module';
import { Student_UrlName } from 'src/app/student/student.module';
import { Teacher_UrlName } from 'src/app/teacher/teacher.module';
import { User_UrlName } from 'src/app/user/user.module';

@Component({
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  menuItems: MenuItem[] = [
    { title: 'Usuarios', url: User_UrlName, icon: 'manage_accounts' },
    { title: 'Cursos', url: Course_UrlName, icon: 'menu_book' },

    { title: 'Estudiantes', url:Student_UrlName, icon: 'person' },
    { title: 'Profesores', url: Teacher_UrlName, icon: 'school' },
  ];



}

interface MenuItem {
  title: string;
  url: string;
  icon: string;
}
