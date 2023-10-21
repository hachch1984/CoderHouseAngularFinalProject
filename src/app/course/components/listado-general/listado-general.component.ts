import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, finalize, of } from 'rxjs';
import { FormModalYesNoComponent, FormModalYesNoInterface } from 'src/app/shared/componets/form-modal-yes-no/form-modal-yes-no.component';
import { CourseInterface } from '../../interfaces/CourseInterface';
import { CourseService } from '../../services/course.service';
import { FormularioInsertarActualizarComponent } from '../formulario-insertar-actualizar/formulario-insertar-actualizar.component';

@Component({
  selector: 'course-listado-general',
  templateUrl: './listado-general.component.html',
  styleUrls: ['./listado-general.component.scss']
})
export class ListadoGeneralComponent   {
 
  constructor(public dialog: MatDialog, public courseService: CourseService) { }
  
  loadingDefaultRows = true;
  columnNames = ['index', 'name', 'type', 'description', 'actions'];
 
  observableGetCourseList = new Observable<CourseInterface[]>((subscriber) => {
    setTimeout(() => {
      subscriber.next(this.courseService.getCourseList());
      subscriber.complete();
    }, 2000);
  }).pipe(
    finalize(() => {
      this.loadingDefaultRows = false;
    })
  );



  refreshObservableGetCourseList(): void {
    this.observableGetCourseList = of(this.courseService.getCourseList());
  }



  bnAgregarCurso_click(): void {

    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result: CourseInterface) => {
      if (result) {
        this.courseService.addCourse(result);
        this.refreshObservableGetCourseList()
      }
    });

  }


  bnEditar_onClick(course: CourseInterface): void {

    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data: course,
    });

    dialogRef.afterClosed().subscribe((result: CourseInterface) => {

      if (result) {
        this.courseService.updateCourse(result);
        this.refreshObservableGetCourseList()
      }
    });
  }

  bnEliminar_onClick(course: CourseInterface): void {

    const data: FormModalYesNoInterface = { title: 'Una Pregunta', message: 'Está seguro que desea eliminar el siguiente curso:<br/><br/>- Nombre: ' + course.name + '<br/>- Tipo de Curso: ' + course.type.name + '<br/>- Descripcion: ' + course.description };

    const dialogRef = this.dialog.open(FormModalYesNoComponent, { data });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.courseService.removeCourse(course);
        this.refreshObservableGetCourseList()
      }
    });

  }









}
function complete(arg0: () => void): ((error: any) => void) | null | undefined {
  throw new Error('Function not implemented.');
}

