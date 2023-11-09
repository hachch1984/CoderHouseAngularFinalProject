import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, finalize } from 'rxjs';
import { FormModalYesNoComponent, FormModalYesNoInterface } from 'src/app/shared/componets/form-modal-yes-no/form-modal-yes-no.component';
import { GenerateUrlName } from 'src/app/shared/utilCode/Code';
import { OperationResultInterface } from 'src/app/store/interfaces/OperationResult';
import { CourseInterface } from '../../../store/interfaces/CourseInterface';
import { CourseService } from '../../../store/services/course.service';
import { FormularioInsertarActualizarComponent } from '../formulario-insertar-actualizar/formulario-insertar-actualizar.component';
import { StudentInterface } from 'src/app/store/interfaces/StudentInterface';

export const Course_ListadoGeneralComponent_UrlName = GenerateUrlName('course-listado-general');

@Component({
  templateUrl: './listado-general.component.html',
  styleUrls: ['./listado-general.component.scss']
})
export class ListadoGeneralComponent implements OnInit {


  columnNames = ['index', 'area', 'name', 'description', 'actions'];
  observable_course_getList = new Observable<CourseInterface[]>();


  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public courseService: CourseService) { }
  ngOnInit(): void {
    this.loadingData = true;
    this.refresh_observable_course_getList();
  }




  loadingData!: boolean;


  refresh_observable_course_getList(result?: OperationResultInterface): void {
    this.loadingData = true;
    this.observable_course_getList = this.courseService.course_getList()
      .pipe(
        finalize(() => {
          this.loadingData = false;
        })
      );

  }



  bnAgregarCurso_click(): void {
    this.dialog
      .open<FormularioInsertarActualizarComponent, CourseInterface, boolean>(FormularioInsertarActualizarComponent, {
        data: undefined,
      })
      .afterClosed()
      .subscribe(result => this.refresh_observable_course_getList());
  }


  bnEditar_onClick(course: CourseInterface): void {
    this.dialog
      .open<FormularioInsertarActualizarComponent, CourseInterface, boolean>(FormularioInsertarActualizarComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe(result => this.refresh_observable_course_getList());
  }

  bnEliminar_onClick(course: CourseInterface): void {

    const data: FormModalYesNoInterface = {
      title: 'Una Pregunta',
      message: 'Está seguro que desea eliminar el siguiente curso:<br/>' +
        '<br/>- Nombre: ' + course.name +
        '<br/>- Tipo de Curso: ' + course.area!.name +
        '<br/>- Descripcion: ' + course.description
    };



    this.dialog
      .open<FormModalYesNoComponent, FormModalYesNoInterface, boolean>(FormModalYesNoComponent, { data })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.courseService.course_remove(course)
            .subscribe(result => {
              this.snackBar.open(result.message, undefined, { duration: 3 * 1000, data: true });
              this.refresh_observable_course_getList(result);
            });
        }
      });


  }









}


