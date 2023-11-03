import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CourseInterface } from '../interfaces/CourseInterface';
import { CourseTypeInterface } from '../interfaces/CourseTypeInterface';
import { OperationResultInterface } from '../interfaces/OperationResult';
import { UserInterface } from '../interfaces/UserInterface';
import { UserTypeEnum } from '../interfaces/UserTypeEnum';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  constructor() {
    this.course_resetList();
    this.user_resetList();
  }




  private userTypeList: UserTypeEnum[] = [UserTypeEnum.admin, UserTypeEnum.student];
  public userType_getList(): Observable<UserTypeEnum[]> {
    return of([...this.userTypeList].sort((a, b) => a.localeCompare(b)));
  }





  private courseList: CourseInterface[] = [];
  public course_resetList(): void {
    this.courseList = [
      { id: '1', name: 'Curso numero uno', type: this.courseTypeList[0], description: 'Descripcion 1' },
      { id: '2', name: 'Curso numero dos', type: this.courseTypeList[1], description: 'Descripcion 2' },
      { id: '3', name: 'Curso numero tres', type: this.courseTypeList[2], description: 'Descripcion 3' },
      { id: '4', name: 'Curso numero cuatro', type: this.courseTypeList[3], description: 'Descripcion 4' },
      { id: '5', name: 'Curso numero cinco', type: this.courseTypeList[4], description: 'Descripcion 5' },
    ];
  }
  public course_getList(): Observable<CourseInterface[]> {
    return of([...this.courseList].sort((a, b) => a.name.localeCompare(b.name)));
  }
  public course_add(course: CourseInterface): Observable<OperationResultInterface> {
    this.courseList.push({ ...course });
    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess: true, message: 'Datos registrados' });
      observer.complete();
    });
  }

  public course_update(course: CourseInterface): Observable<OperationResultInterface> {
    this.courseList = this.courseList.map(x => x.id == course.id ? { ...course } : x);
    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess: true, message: 'Datos actualizados' });
      observer.complete();
    });
  }
  public course_remove(course: CourseInterface): Observable<OperationResultInterface> {
    this.courseList = this.courseList.filter(x => x.id !== course.id);
    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess: true, message: 'Datos eliminados' });
      observer.complete();
    });
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
  public courseType_getList(): Observable<CourseTypeInterface[]> {
    return of([...this.courseTypeList]);
  }
  public courseType_exists(id: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      observer.next(this.courseTypeList.findIndex((item) => item.id === id) !== -1 ? true : false);
      observer.complete();
    });
  }



  private userList: UserInterface[] = [];
  public user_resetList(): void {
    this.userList = [
      {
        id: '1',
        fullName: 'Henry Chavez',
        userType: UserTypeEnum.admin,
        email: 'henry@email.com',
        password: '123',
        photoBase64: ''
      },
      {
        id: '2',
        fullName: 'Joel Castro',
        userType: UserTypeEnum.student,
        email: 'joel.castro@email.com',
        password: '123',
        photoBase64: ''
      },
    ];
  }
  public user_getList(): Observable<UserInterface[]> {
    return of([...this.userList].sort((a, b) => a.fullName.localeCompare(b.fullName)));
  }
  public user_existsEmail(id: string, email: string): Observable<boolean> {
     
    return new Observable<boolean>(observer => {
      
      if (this.userList.find(x => x.id !== id && x.email.toUpperCase() === email.toUpperCase()) === undefined) {
        observer.next(false);
      }
      else {
        observer.next(true);
      }
      observer.complete();
    });

  }
  public user_add(user: UserInterface): Observable<OperationResultInterface> {
    let isSuccess = false;
    let message = 'Datos ya existentes';

    if (this.userList.find(x => x.email.toUpperCase() === user.email.toUpperCase()) === undefined) {
      this.userList.push({ ...user });
      isSuccess = true;
      message = 'Datos registrados';
    }

    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess, message });
      observer.complete();
    });
  }

  public user_update(user: UserInterface): Observable<OperationResultInterface> {
    this.userList = this.userList.map(x => x.id == user.id ? { ...user } : x);
    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess: true, message: 'Datos actualizados' });
      observer.complete();
    });
  }
  public user_remove(user: UserInterface): Observable<OperationResultInterface> {
    this.userList = this.userList.filter(x => x.id !== user.id);
    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess: true, message: 'Datos eliminados' });
      observer.complete();
    });
  }






}
