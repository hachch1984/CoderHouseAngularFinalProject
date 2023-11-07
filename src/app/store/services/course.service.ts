import { Injectable } from '@angular/core';
import { Observable, filter, map, of, switchMap, toArray } from 'rxjs';
import { CourseInterface } from '../interfaces/CourseInterface';
import { AreaInterface } from '../interfaces/AreaInterface';
import { OperationResultInterface } from '../interfaces/OperationResult';
import { UserInterface } from '../interfaces/UserInterface';
import { UserTypeEnum } from '../interfaces/UserTypeEnum';
import { StudentInterface } from '../interfaces/StudentInterface';
import { v4 as uuidv4 } from 'uuid';

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
      { id: '1', name: 'Autocad', area_id: '1', area: undefined, description: 'Curso de autocad online' },
      { id: '11', name: 'Inventor', area_id: '1', area: undefined, description: 'Curso de inventor online' },
      { id: '111', name: 'Civil 3D', area_id: '1', area: undefined, description: 'Curso de civil 3d online' },

      { id: '2', name: 'Penal', area_id: '2', area: undefined, description: 'especializacion leyes penales' },
      { id: '22', name: 'Administrativo', area_id: '2', area: undefined, description: 'especializacino en leyes administrativas' },
      { id: '222', name: 'Procesal', area_id: '2', area: undefined, description: 'especializacion en leyes procesal' },

      { id: '3', name: 'Industrial', area_id: '3', area: undefined, description: 'dibujo de tio industrial' },
      { id: '33', name: 'Coorporativo', area_id: '3', area: undefined, description: 'dibujo de tipo coorporativo' },
      { id: '333', name: 'Procesos', area_id: '3', area: undefined, description: 'dibujo para procesos' },


      { id: '4', name: 'Angular', area_id: '4', area: undefined, description: 'tecnologia angular' },
      { id: '44', name: 'React', area_id: '4', area: undefined, description: 'tecnologia react' },
      { id: '4', name: 'C#', area_id: '4', area: undefined, description: 'tecnologia c#' },


    ];
  }
  public course_get_byId(id: string): Observable<CourseInterface | undefined> {
    return new Observable<CourseInterface | undefined>(observer => {
      const obj = this.courseList.find(x => x.id === id);
      observer.next(obj ? { ...obj, area: this.areaList.find(x => x.id === obj.area_id) } : undefined);
      observer.complete();
    });
  };
  public course_getList(): Observable<CourseInterface[]> {
    return of([...this.courseList]
      .map(course => ({ ...course, area: this.areaList.find(x => x.id === course.area_id) }))
      .sort((a, b) => (a.area!.name! + ' ' + a.name).localeCompare(b.area!.name! + ' ' + b.name)));
  }
  public course_getList_by_areaId(areaId: string): Observable<CourseInterface[]> {
    let arr = [...this.courseList]
      .filter(x => x.area!.id === areaId)
      .map(course => ({ ...course, area: this.areaList.find(x => x.id === course.area_id) }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return of(arr.length > 0 ? arr : []);
  }
  public course_add(course: CourseInterface): Observable<OperationResultInterface> {
    let isSuccess: boolean;
    let message: string;

    if (this.courseList.find(x => x.area_id === course.area?.id && x.name.toUpperCase() === course.name.toUpperCase()) !== undefined) {
      isSuccess = false;
      message = 'El nombre del curso ya existe';
    }
    else {
      this.courseList.push({ ...course, id: uuidv4(), area_id: course.area!.id!, area:undefined });
      message = 'Curso registrado correctamente';
      isSuccess = true;
    }

    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess, message });
      observer.complete();
    });
  }

  public course_update(course: CourseInterface): Observable<OperationResultInterface> {
    let isSuccess: boolean;
    let message: string;

    if (this.courseList.find(x => x.id === course.id) === undefined) {
      isSuccess = false;
      message = 'El curso no existe';
    } else {
      isSuccess = true;
      message = 'Curso actualizado';
      this.courseList = this.courseList.map(x => x.id == course.id ? { ...course } : x);
    }

    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess, message });
      observer.complete();
    });
  }
  public course_remove(course: CourseInterface): Observable<OperationResultInterface> {
    let isSuccess: boolean;
    let message: string;

    if (this.courseList.find(x => x.id === course.id) === undefined) {
      isSuccess = false;
      message = 'El curso no existe';
    } else {
      isSuccess = true;
      message = 'Curso eliminado';
      this.courseList = this.courseList.filter(x => x.id !== course.id);
    }

    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess, message });
      observer.complete();
    });
  }





  private areaList: AreaInterface[] = [
    { id: '1', name: 'Arquitectura' },
    { id: '2', name: 'Derecho' },
    { id: '3', name: 'Diseño' },
    { id: '4', name: 'Programacion' },

  ].sort((a, b) => a.name.localeCompare(b.name));
  public area_getList(): Observable<AreaInterface[]> {
    return of([...this.areaList]);
  }
  public area_exists(id: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      observer.next(this.areaList.findIndex((item) => item.id === id) !== -1 ? true : false);
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
  public user_get_byId(id: string): Observable<UserInterface | undefined> {
    return new Observable<UserInterface | undefined>(observer => {
      const obj = this.userList.find(x => x.id === id);
      observer.next(obj ? { ...obj } : undefined);
      observer.complete();
    });
  }
  public user_getList(): Observable<UserInterface[]> {
    return of(
      [...this.userList]
        .sort((a, b) => a.fullName.localeCompare(b.fullName))
    );
  }
  public user_getList_onlyStudents(areaId: string, courseId: string): Observable<UserInterface[]> {
    return of(
      [...this.userList]
        .filter(x => x.userType === UserTypeEnum.student)
        .sort((a, b) => a.fullName.localeCompare(b.fullName))
    );
  }
  public user_getList_byFullName(fullName: string): Observable<UserInterface[]> {
    let arr = [...this.userList]
      .filter(x => x.fullName.toUpperCase().includes(fullName.toUpperCase()))
      .sort((a, b) => a.fullName.localeCompare(b.fullName));
    return of(arr.length > 0 ? arr : []);
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
    let isSuccess: boolean;
    let message: string;

    if (this.userList.find(x => x.email.toUpperCase() === user.email.toUpperCase()) !== undefined) {
      isSuccess = false;
      message = 'El email ya esta registrado';
    }
    else {
      isSuccess = true;
      message = 'Usuario Registrado';
      this.userList.push({ ...user, id: uuidv4() });
    }

    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess, message });
      observer.complete();
    });
  }

  public user_update(user: UserInterface): Observable<OperationResultInterface> {
    let isSuccess: boolean;
    let message: string;

    if (this.userList.find(x => x.id === user.id) === undefined) {
      isSuccess = false;
      message = 'El usuario no existe';
    } else if (this.userList.find(x => x.email.toUpperCase() === user.email.toUpperCase() && x.id !== user.id) !== undefined) {
      isSuccess = false;
      message = 'El email ya esta registrado';
    } else {
      isSuccess = true;
      message = 'Usuario actualizado';
      this.userList = this.userList.map(x => x.id == user.id ? { ...user } : x);
    }

    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess, message });
      observer.complete();
    });
  }
  public user_remove(user: UserInterface): Observable<OperationResultInterface> {
    let isSuccess: boolean;
    let message: string;

    if (this.userList.find(x => x.id === user.id) === undefined) {
      isSuccess = false;
      message = 'El usuario no existe';
    } else {
      isSuccess = true;
      message = 'Usuario eliminado';
      this.userList = this.userList.filter(x => x.id !== user.id);
    }

    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess, message });
      observer.complete();
    });
  }






  private studentList: StudentInterface[] = [];
  public student_getList(): Observable<StudentInterface[]> {
    const courseListAux = [...this.courseList];
    const userListAux = [...this.userList];
    return of([...this.studentList])
      .pipe(
        map(studentList => studentList.map(student => {
          const course = courseListAux.find(x => x.id === student.course_id);
          const user = userListAux.find(x => x.id === student.user_id);
          student = { ...student, course, user };
          return student;
        }))
      );
  }
  public student_getList_by_courseId_and_fullName(areaId: string, courseId: string, fullName: string): Observable<StudentInterface[]> {
    return this.student_getList()
      .pipe(
        map(students =>
          students.filter(student =>
            (areaId ? student.course?.area!.id === areaId : true) &&
            (courseId ? student.course_id === courseId : true) &&
            (fullName ? student.user!.fullName.toUpperCase().includes(fullName.toUpperCase()) : true)
          )
        ),
      );
  }
  public student_get_byId(id: string): Observable<StudentInterface | undefined> {
    const courseListAux = [...this.courseList];
    const userListAux = [...this.userList];
    const student = [...this.studentList].find(x => x.id === id);
    if (student) {
      return of(student)
        .pipe(
          map(student => {
            const course = courseListAux.find(x => x.id === student.course_id);
            const user = userListAux.find(x => x.id === student.user_id);
            student = { ...student, course, user };
            return student;
          })
        );
    }
    else {
      return of(undefined);
    }
  }
  public student_add(student: StudentInterface): Observable<OperationResultInterface> {
    let isSuccess: boolean;
    let message: string;

    if (this.studentList.find(x => x.course_id === student.course_id && x.user_id === student.user_id) !== undefined) {
      isSuccess = false;
      message = 'El usuario ya esta registrado en el curso';
    } else {
      isSuccess = true;
      message = 'Estudiante registrado correctamente en el curso';
      this.studentList.push({ ...student, id: uuidv4(), course: undefined, user: undefined });
    }

    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess, message });
      observer.complete();
    });
  }
  public student_update(student: StudentInterface): Observable<OperationResultInterface> {
    let isSuccess: boolean;
    let message: string;

    if (this.studentList.find(x => x.id === student.id) === undefined) {
      isSuccess = false;
      message = 'El estudiante no existe';
    }
    else if (this.studentList.find(x => x.course_id === student.course_id && x.user_id === student.user_id) !== undefined) {
      isSuccess = false;
      message = 'El usuario ya esta registrado en el curso';
    } else {
      isSuccess = true;
      message = 'Estudiante actualizado correctamente en el curso';
      this.studentList = this.studentList.map(x => x.id === student.id ? { ...student, course: undefined, user: undefined } : x);
    }

    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess, message });
      observer.complete();
    });
  }
  public student_remove(student: StudentInterface): Observable<OperationResultInterface> {
    let isSuccess: boolean;
    let message: string;

    if (this.studentList.find(x => x.id === student.id) === undefined) {
      isSuccess = false;
      message = 'El estudiante no existe';
    } else {
      isSuccess = true;
      message = 'Estudiante eliminado correctamente del curso';
      this.studentList = this.studentList.filter(x => x.id !== student.id);
    }

    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess, message });
      observer.complete();
    });
  }


}
