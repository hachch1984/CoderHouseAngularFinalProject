import { Component } from '@angular/core';

@Component({
  selector: 'main-application-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  menuItems: MenuItem[] = [
    { title: 'Cursos', url: '/course', icon: 'menu_book' },
    { title: 'Estudiantes', url: '/student', icon: 'person' },
    { title: 'Profesores', url: '/teacher', icon: 'school' },
  ];



}

interface MenuItem {
  title: string;
  url: string;
  icon: string;
}
