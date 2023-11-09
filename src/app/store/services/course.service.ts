import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map, of, switchMap, toArray } from 'rxjs';
import { CourseInterface } from '../interfaces/CourseInterface';
import { AreaInterface } from '../interfaces/AreaInterface';
import { OperationResultInterface } from '../interfaces/OperationResult';
import { UserInterface } from '../interfaces/UserInterface';
import { UserTypeEnum } from '../interfaces/UserTypeEnum';
import { StudentInterface } from '../interfaces/StudentInterface';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }


  private returnOperationResult(isSuccess: boolean, message: string): Observable<OperationResultInterface> {
    return new Observable<OperationResultInterface>(observer => {
      observer.next({ isSuccess, message });
      observer.complete();
    });
  }




  public userType_getList(): Observable<UserTypeEnum[]> {
    return this.http.get<UserTypeEnum[]>(`${this.baseUrl}/userTypes`).pipe(
      map(arr => arr.sort((a, b) => a.localeCompare(b)))
    );
  }





  public course_get_byId(id: string): Observable<CourseInterface> {
    return this.http.get<CourseInterface>(`${this.baseUrl}/courses?id=${id}`)
      .pipe(
        switchMap(course =>
          this.area_get_byId(course.area_id).pipe(
            map(area => ({ ...course, area }))
          )
        )
      );
  }
  public course_getList(): Observable<CourseInterface[]> {

    return this.http.get<CourseInterface[]>(`${this.baseUrl}/courses`)
      .pipe(
        switchMap(courses =>
          this.area_getList().pipe(
            map(areas => {
              return courses.map(course => ({ ...course, area: areas.find(x => x.id === course.area_id) }))
                .sort((a, b) => (a.area?.name + ' ' + a.name).localeCompare(b.area?.name + ' ' + b.name))
            })
          )
        )
      );
  }
  public course_getList_by_areaId(areaId: string): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${this.baseUrl}/courses?area_id=${areaId}`).pipe(
      switchMap(courses => {
        return this.area_get_byId(areaId).pipe(
          map(area => {
            return courses.map(course => ({ ...course, area })).sort((a, b) => a.name.localeCompare(b.name))
          })
        )
      })
    );
  }
  public course_add(course: CourseInterface): Observable<OperationResultInterface> {
    return this.course_getList()
      .pipe(
        switchMap(courses => {
          if (courses.find(x => x.area_id === course.area?.id && x.name.toUpperCase() === course.name.toUpperCase()) !== undefined) {
            return this.returnOperationResult(false, 'El nombre del curso ya existe');
          }
          else {
            course={...course,area_id:course.area?.id!};
            return this.http.post<OperationResultInterface>(`${this.baseUrl}/courses`, course)
              .pipe(
                switchMap(or => this.returnOperationResult(true, 'Curso actualizado correctamente')),
                catchError(error => this.returnOperationResult(false, 'Error al actualizar el curso'))
              );
          }
        }),
      );
  }
  public course_update(course: CourseInterface): Observable<OperationResultInterface> {
    return this.course_getList()
      .pipe(
        switchMap(courses => {
          if (courses.find(x => x.id === course.id) === undefined) {
            return this.returnOperationResult(false, 'El curso no existe');
          }
          else if (courses.find(x => x.id !== course.id && x.area_id === course.area?.id && x.name.toUpperCase() === course.name.toUpperCase()) !== undefined) {
            return this.returnOperationResult(false, 'El nombre del curso ya existe');
          }
          else {
            course={...course,area_id:course.area?.id!};
            return this.http.put<OperationResultInterface>(`${this.baseUrl}/courses/${course.id}`, course)
              .pipe(
                switchMap(or => this.returnOperationResult(true, 'Curso actualizado correctamente')),
                catchError(error => this.returnOperationResult(false, 'Error al actualizar el curso'))
              );
          }
        }),
      );
  }
  public course_remove(course: CourseInterface): Observable<OperationResultInterface> {
    return this.course_get_byId(course.id!)
      .pipe(
        switchMap(obj => {
          if (!obj) {
            return this.returnOperationResult(false, 'El curso no existe');
          }
          else {
            return this.http.delete<OperationResultInterface>(`${this.baseUrl}/courses/${course.id}`,)
              .pipe(
                switchMap(or => this.returnOperationResult(true, 'Curso actualizado correctamente')),
                catchError(error => this.returnOperationResult(false, 'Error al actualizar el curso'))
              );
          }
        }
        )
      );
  }



  public area_getList(): Observable<AreaInterface[]> {
    return this.http.get<AreaInterface[]>(`${this.baseUrl}/areas`)
      .pipe(
        map(areas => areas.sort((a, b) => a.name.localeCompare(b.name))
        )
      );
  }
  public area_exists(id: string): Observable<boolean> {
    return this.http.get<AreaInterface>(`${this.baseUrl}/areas?id=${id}`)
      .pipe(
        map(value => value ? true : false)
      );
  }
  public area_get_byId(id: string): Observable<AreaInterface> {
    return this.http.get<AreaInterface>(`${this.baseUrl}/areas?id=${id}`);
  }








  public user_get_by_email(email: string): Observable<UserInterface | undefined> {
    return this.http.get<UserInterface>(`${this.baseUrl}/users?email=${email}`);
  }
  public user_get_byId(id: string): Observable<UserInterface | undefined> {
    return this.http.get<UserInterface>(`${this.baseUrl}/users?id=${id}`);
  }
  public user_getList(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.baseUrl}/users`)
      .pipe(map(users => users.sort((a, b) => a.fullName.localeCompare(b.fullName))));
  }
  public user_getList_onlyStudents(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.baseUrl}/users?userType=${UserTypeEnum.student}`)
      .pipe(map(users => users.sort((a, b) => a.fullName.localeCompare(b.fullName))));
  }
  public user_getList_byFullName(fullName: string): Observable<UserInterface[]> {
    return this.user_getList()
      .pipe(
        map(arr => arr.filter(x => x.fullName.toUpperCase().includes(fullName.toUpperCase()))
          .sort((a, b) => a.fullName.localeCompare(b.fullName))
        )
      );
  }
  public user_existsEmail(id: string, email: string): Observable<boolean> {
    return this.user_getList()
      .pipe(
        map(arr => arr.find(x => x.id !== id && x.email.toUpperCase() === email.toUpperCase()) !== undefined ? true : false)
      );
  }
  public user_add(user: UserInterface): Observable<OperationResultInterface> {
    return this.user_get_by_email(user.email).pipe(
      switchMap(obj => {
        if (obj) {
          return this.returnOperationResult(false, 'El email ya esta registrado');
        }
        else {
          return this.http.post<OperationResultInterface>(`${this.baseUrl}/users`, user)
            .pipe(
              switchMap(or => this.returnOperationResult(true, 'Usuario actualizado correctamente')),
              catchError(error => this.returnOperationResult(false, 'Error al registrar el usuario'))
            );
        }
      }),
    );
  }
  public user_update(user: UserInterface): Observable<OperationResultInterface> {
    return this.user_getList().pipe(
      switchMap(users => {
        if (users.find(x => x.id === user.id) === undefined) {
          return this.returnOperationResult(false, 'El usuario no existe');
        }
        else if (users.find(x => x.id !== user.id && x.email.toUpperCase() === user.email.toUpperCase()) !== undefined) {
          return this.returnOperationResult(false, 'El email ya esta registrado');
        }
        else {
          return this.http.put<OperationResultInterface>(`${this.baseUrl}/users/${user.id}`, user)
            .pipe(
              switchMap(or => this.returnOperationResult(true, 'Usuario actualizado correctamente')),
              catchError(error => this.returnOperationResult(false, 'Error al actualizar el usuario'))
            );
        }
      }),
    );

  }
  public user_remove(user: UserInterface): Observable<OperationResultInterface> {

    return this.user_getList().pipe(
      switchMap(users => {
        if (users.find(x => x.id === user.id) === undefined) {
          return this.returnOperationResult(false, 'El usuario no existe');
        }
        else {
          return this.http.delete<OperationResultInterface>(`${this.baseUrl}/users/${user.id}`)
            .pipe(
              switchMap(or => this.returnOperationResult(true, 'Usuario eliminado correctamente')),
              catchError(error => this.returnOperationResult(false, 'Error al eliminar el usuario'))
            );
        }
      }),
    );

  }





  public student_getList(): Observable<StudentInterface[]> {
    return this.http.get<StudentInterface[]>(`${this.baseUrl}/students`).pipe(
      switchMap(students => {
        return this.course_getList().pipe(
          switchMap(courses => {
            return this.user_getList().pipe(
              map(users => {
                return students.map(student => {
                  return {
                    ...student,
                    course: courses.find(x => x.id === student.course_id),
                    user: users.find(x => x.id === student.user_id)
                  }
                })
              })
            )
          })
        )
      }),
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
    return this.http.get<StudentInterface>(`${this.baseUrl}/students?id=${id}`);
  }
  public student_add(student: StudentInterface): Observable<OperationResultInterface> {
    return this.student_getList().pipe(
      switchMap(students => {
        if (students.find(x => x.course_id === student.course?.id && x.user_id === student.user?.id) !== undefined) {
          return this.returnOperationResult(false, 'El usuario ya esta registrado en el curso');
        }
        else {
          student = { ...student, user_id: student.user?.id!, course_id: student.course?.id! }
          return this.http.post<OperationResultInterface>(`${this.baseUrl}/students`, student)
            .pipe(
              switchMap(or => this.returnOperationResult(true, 'Estudiante registrado correctamente')),
              catchError(error => this.returnOperationResult(false, 'Error al registrar el estudiante'))
            );
        }
      }),
    );
  }
  public student_update(student: StudentInterface): Observable<OperationResultInterface> {

    return this.student_getList().pipe(
      switchMap(students => {
        if (students.find(x => x.id === student.id) === undefined) {
          return this.returnOperationResult(false, 'El estudiante no existe');
        }
        else if (students.find(x => x.id !== student.id && x.course_id === student.course?.id && x.user_id === student.user?.id) !== undefined) {
          return this.returnOperationResult(false, 'El usuario ya esta registrado en el curso');
        }
        else {
          student = { ...student, user_id: student.user?.id!, course_id: student.course?.id! }
          return this.http.put<OperationResultInterface>(`${this.baseUrl}/students/${student.id}`, student)
            .pipe(
              switchMap(or => this.returnOperationResult(true, 'Estudiante actualizado correctamente')),
              catchError(error => this.returnOperationResult(false, 'Error al actualizar el estudiante'))
            );
        }
      }),
    );
  }
  public student_remove(student: StudentInterface): Observable<OperationResultInterface> {
    return this.student_getList().pipe(
      switchMap(students => {
        if (students.find(x => x.id === student.id) === undefined) {
          return this.returnOperationResult(false, 'El estudiante no existe');
        }
        else {
          return this.http.delete<OperationResultInterface>(`${this.baseUrl}/students/${student.id}`)
            .pipe(
              switchMap(or => this.returnOperationResult(true, 'Estudiante eliminado correctamente')),
              catchError(error => this.returnOperationResult(false, 'Error al eliminar el estudiante'))
            );
        }
      }),
    );
  }


}
