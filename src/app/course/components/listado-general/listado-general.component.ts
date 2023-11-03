import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, finalize } from 'rxjs';
import { FormModalYesNoComponent, FormModalYesNoInterface } from 'src/app/shared/componets/form-modal-yes-no/form-modal-yes-no.component';
import { GenerateUrlName } from 'src/app/shared/utilCode/Code';
import { CourseInterface } from '../../../store/interfaces/CourseInterface';
import { CourseService } from '../../../store/services/course.service';
import { FormularioInsertarActualizarComponent } from '../formulario-insertar-actualizar/formulario-insertar-actualizar.component';

export const Course_ListadoGeneralComponent_UrlName = GenerateUrlName('course-listado-general');

@Component({ 
  templateUrl: './listado-general.component.html',
  styleUrls: ['./listado-general.component.scss']
})
export class ListadoGeneralComponent implements OnInit {


  columnNames = ['index', 'name', 'type', 'description', 'actions'];
  observable_course_getList = new Observable<CourseInterface[]>();


  constructor(public dialog: MatDialog, public courseService: CourseService) { }
  ngOnInit(): void {
    this.loadingData = true;
    this.refresh_observable_course_getList();
  }



  loadingData!: boolean;


  refresh_observable_course_getList(): void {

    this.observable_course_getList = this.courseService.course_getList()
      .pipe(
        finalize(() => {
          this.loadingData = false;
        })
      );
  }



  bnAgregarCurso_click(): void {

    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result: CourseInterface) => {
      if (result) {
        this.loadingData = true;
        this.courseService.course_add(result)
          .subscribe(result => {
            if (result.isSuccess) {
              this.refresh_observable_course_getList();
            }
          });
      }
    });

  }


  bnEditar_onClick(course: CourseInterface): void {

    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data: course,
    });

    dialogRef.afterClosed().subscribe((result: CourseInterface) => {

      if (result) {
        this.loadingData = true;
        this.courseService.course_update(result).subscribe(result => {
          if (result.isSuccess) {
            this.refresh_observable_course_getList();
          }
        });
      }
    });
  }

  bnEliminar_onClick(course: CourseInterface): void {

    const data: FormModalYesNoInterface = { title: 'Una Pregunta', message: 'Está seguro que desea eliminar el siguiente curso:<br/><br/>- Nombre: ' + course.name + '<br/>- Tipo de Curso: ' + course.type.name + '<br/>- Descripcion: ' + course.description };

    const dialogRef = this.dialog.open(FormModalYesNoComponent, { data });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadingData = true;
        this.courseService.course_remove(course)
          .subscribe(result => {
            if (result.isSuccess) {
              this.refresh_observable_course_getList();
            }
          });
      }
    });

  }









}


