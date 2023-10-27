import { Injectable } from '@angular/core';
import { CourseInterface } from '../interfaces/CourseInterface';
import { CourseTypeInterface } from '../interfaces/CourseTypeInterface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courseList: CourseInterface[] = [];

  constructor() {
    this.course_resetList();
  }






  public course_resetList(): void {     
    this.courseList = [
      { id: '1', name: 'Curso numero uno', type: this.courseTypeList[0], description: 'Descripcion 1' },
      { id: '2', name: 'Curso numero dos', type: this.courseTypeList[1], description: 'Descripcion 2' },
      { id: '3', name: 'Curso numero tres', type: this.courseTypeList[2], description: 'Descripcion 3' },
      { id: '4', name: 'Curso numero cuatro', type: this.courseTypeList[3], description: 'Descripcion 4' },
      { id: '5', name: 'Curso numero cinco', type: this.courseTypeList[4], description: 'Descripcion 5' },
    ];
  }

  public course_getList(): Observable< CourseInterface[] >{
    return   of ([...this.courseList].sort((a, b) => a.name.localeCompare(b.name)));
  }

  public course_add(course: CourseInterface): void {
    this.courseList.push({ ...course });
  }

  public course_update(course: CourseInterface): void {
    this.courseList = this.courseList.map(x => x.id == course.id ? { ...course } : x);
  }
  public course_remove(course: CourseInterface): void {
    this.courseList = this.courseList.filter(x => x.id !== course.id);
  }





  private courseTypeList: CourseTypeInterface[] = [
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

  public courseType_getList(): Observable< CourseTypeInterface[]> {
    return of ( [...this.courseTypeList]);
  }




}
