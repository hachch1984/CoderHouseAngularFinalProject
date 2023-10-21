import { Injectable } from '@angular/core';
import { CourseInterface } from '../interfaces/CourseInterface';
import { CourseTypeInterface } from '../interfaces/CourseTypeInterface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courseList: CourseInterface[] = [];

  constructor() {
    this.resetCourseList();
  }

  public resetCourseList(): void {
    const arr=this.getCourseTypeList();
    this.courseList = [
      { id: '1', name: 'Curso numero uno', type: arr[0], description: 'Descripcion 1' },
      { id: '2', name: 'Curso numero dos', type: arr[1], description: 'Descripcion 2' },
      { id: '3', name: 'Curso numero tres', type: arr[2], description: 'Descripcion 3' },
      { id: '4', name: 'Curso numero cuatro', type: arr[3], description: 'Descripcion 4' },
      { id: '5', name: 'Curso numero cinco', type: arr[4], description: 'Descripcion 5' },
    ];
  }

  public getCourseList(): CourseInterface[] {
    return [...this.courseList].sort((a, b) => a.name.localeCompare(b.name));
  }

  public addCourse(course: CourseInterface): void {
    this.courseList.push({...course});
  }

  public updateCourse(course: CourseInterface): void {
    this.courseList = this.courseList.map(x => x.id == course.id ? {...course} : x);
  }
  public removeCourse(course: CourseInterface): void {
    this.courseList = this.courseList.filter(x => x.id !== course.id);
  }



  public getCourseTypeList(): CourseTypeInterface[] {
    return [
      { id: '1', name: 'Programacion' },
      { id: '2', name: 'Diseño' },
      { id: '3', name: 'Matematicas' },
      { id: '4', name: 'Fisica' },
      { id: '5', name: 'Quimica' },
      { id: '6', name: 'Ingles' },
      { id: '7', name: 'Ingenieria' },
      { id: '8', name: 'Arquitectura' },
      { id: '9', name: 'Derecho' },
      { id: '10', name: 'Medicina' },
      { id: '11', name: 'Enfermeria' },
    ].sort((a, b) => a.name.localeCompare(b.name));
  }




}
