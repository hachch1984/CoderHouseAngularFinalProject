import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, switchMap } from 'rxjs';
import { GenerateUrlName } from 'src/app/shared/utilCode/Code';
import { CourseInterface } from 'src/app/store/interfaces/CourseInterface';
import { StudentInterface } from 'src/app/store/interfaces/StudentInterface';
import { CourseService } from 'src/app/store/services/course.service';
import { FormularioInsertarActualizarComponent } from '../formulario-insertar-actualizar/formulario-insertar-actualizar.component';
import { AreaInterface } from 'src/app/store/interfaces/AreaInterface';
import { FormModalYesNoComponent, FormModalYesNoInterface } from 'src/app/shared/componets/form-modal-yes-no/form-modal-yes-no.component';



export const Student_ListadoGeneralComponent_UrlName: string = GenerateUrlName('student-listado-general');

@Component({
  templateUrl: './listado-general.component.html',
  styleUrls: ['./listado-general.component.scss']
})
export class ListadoGeneralComponent implements OnInit {

  studentList: StudentInterface[] = [];
  columnNames: string[] = ['index', 'area', 'course', 'fullName', 'picture', 'actions'];
  objArea_empty: AreaInterface = { id: '', name: '-- Seleccione un area --' };
  objCourse_noData: CourseInterface = { id: '', name: '-- No hay cursos --', area_id: '', area: undefined, description: '' };
  objCourse_empty: CourseInterface = { id: '', name: '-- Seleccione un curso --', area_id: '', area: undefined, description: '' };
  observable_areaList = this.courseService.area_getList()
    .pipe(
      map(value => {
        value.unshift(this.objArea_empty);
        return value;
      })
    );
  observable_courseList = new Observable<CourseInterface[]>();
  observable_studentList = new Observable<StudentInterface[]>();

  myForm = this.fb.group({
    areaId: [''],
    courseId: [''],
    fullName: ['']
  });


  constructor(
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    private fb: FormBuilder,
    private dialog: MatDialog,) {
  }


  ngOnInit(): void {
    this.observable_courseList = this.myForm.get('areaId')!.valueChanges
      .pipe(
        switchMap((value) => this.courseService.course_getList_by_areaId(value!)),
        map(value => {
          if (value.length === 0) {
            value.unshift(this.objCourse_noData);
          } else {
            value.unshift(this.objCourse_empty);
          }
          return value;
        }),
      );

      this.buscar_studentList();
  }



  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, { duration: 3 * 1000, data: true });
  }

  buscar_studentList(): void {
    let areaId = this.myForm.get('areaId')!.value!;
    let courseId = this.myForm.get('courseId')!.value!;
    let fullName = this.myForm.get('fullName')!.value!;

    this.observable_studentList = this.courseService.student_getList_by_courseId_and_fullName(areaId, courseId, fullName);
  }

  bnBuscar_onClick() {
    this.buscar_studentList();
  }
  fullName_onKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.bnBuscar_onClick();
    }
  }


  bnAgregar_onClick() {
    this.dialog.open<FormularioInsertarActualizarComponent,StudentInterface,boolean>(FormularioInsertarActualizarComponent, {
      data: undefined,
    })
      .afterClosed()
      .subscribe(result => result && this.buscar_studentList());
  }


  bnEditar_onClick(student: StudentInterface) {
    this.dialog.open<FormularioInsertarActualizarComponent,StudentInterface,boolean>(FormularioInsertarActualizarComponent, {
      data: student,
    })
      .afterClosed()
      .subscribe(result => result && this.buscar_studentList());
  }

  bnEliminar_onClick(student: StudentInterface) {
    const data: FormModalYesNoInterface = {
      title: 'Una Pregunta',
      message: 'Está seguro de eliminar al alumno:<br/>' +
        '<br/>- Usuario: ' + student.user?.fullName +
        '<br/>- Area: ' + student.course?.area?.name +
        '<br/>- Curso: ' + student.course?.name
    };
 
    this.dialog
      .open<FormModalYesNoComponent,FormModalYesNoInterface,boolean > (FormModalYesNoComponent, { data })
      .afterClosed()
      .subscribe(result => {
        result && this.courseService.student_remove(student)
          .subscribe(result => {
            this.openSnackBar(result.message);
            result.isSuccess && this.buscar_studentList();
          });
      });
  }


}
