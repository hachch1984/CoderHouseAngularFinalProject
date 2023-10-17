import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioInsertarActualizarComponent } from '../formulario-insertar-actualizar/formulario-insertar-actualizar.component';
import { CourseInterface } from '../../interfaces/CourseInterface';
import { CourseTypeList } from '../../interfaces/CourseType';
import { FormModalYesNoComponent, FormModalYesNoInterface } from 'src/app/shared/componets/form-modal-yes-no/form-modal-yes-no.component';

@Component({
  selector: 'course-listado-general',
  templateUrl: './listado-general.component.html',
  styleUrls: ['./listado-general.component.scss']
})
export class ListadoGeneralComponent {

  constructor(public dialog: MatDialog) { }

  bnAgregarCurso_click(): void {

    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result: CourseInterface) => {

      if (result) {
        this.courseList.push(result);
      }
    });

  }


  private courseList: CourseInterface[] = [
    { id: '1', name: 'Curso 1', type: CourseTypeList[0], description: 'Descripcion 1' },
    { id: '2', name: 'Curso 2', type: CourseTypeList[1], description: 'Descripcion 2' },
    { id: '3', name: 'Curso 0', type: CourseTypeList[2], description: 'Descripcion 3' },

  ]


  getCourseList(): CourseInterface[] {
    return this.courseList.sort((a, b) => a.name.localeCompare(b.name));
  }


  bnEditar_onClick(course: CourseInterface): void {

    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data: course,
    });

    dialogRef.afterClosed().subscribe((result: CourseInterface) => {

      if (result) {
        this.courseList = this.courseList.map(item => item.id === result.id ? result : item)
      }
    });
  }

  bnEliminar_onClick(course: CourseInterface): void {

    const data: FormModalYesNoInterface = { title: 'Una Pregunta', message: 'Está seguro que desea eliminar el siguiente curso:<br/><br/>- Nombre: ' + course.name+'<br/>- Tipo de Curso: '+course.type.name + '<br/>- Descripcion: '+course.description };

    const dialogRef = this.dialog.open(FormModalYesNoComponent, { data });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.courseList = this.courseList.filter(item => item.id !== course.id);
      }
    });

  }



}
