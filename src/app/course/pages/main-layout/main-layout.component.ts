import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioInsertarActualizarComponent } from '../../components/formulario-insertar-actualizar/formulario-insertar-actualizar.component';
import { CourseInterface } from '../../interfaces/CourseInterface';


export const Course_MainLayoutComponent_UrlName = 'main-layout';
@Component({
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  constructor(public dialog: MatDialog) { }

  bnAgregarCurso_click(): void {

    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data: undefined,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - result',result);

      if (result) {
        this.courseList.push(result);
      }
    });

  }


  courseList: CourseInterface[] = []



}


