import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, finalize, startWith } from 'rxjs';
import { FormModalYesNoComponent, FormModalYesNoInterface } from 'src/app/shared/componets/form-modal-yes-no/form-modal-yes-no.component';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { CourseService } from 'src/app/store/services/course.service';
import { FormularioInsertarActualizarComponent } from '../formulario-insertar-actualizar/formulario-insertar-actualizar.component';


export const ListadoGeneralComponent_UrlName = 'listado-general';

@Component({
  selector: 'user-listado-general',
  templateUrl: './listado-general.component.html',
  styleUrls: ['./listado-general.component.scss']
})
export class ListadoGeneralComponent implements OnInit {

  columnNames = ['index', 'fullName', 'userType', 'picture', 'actions',];
  loadingData = true;
  observable_user_getList = new Observable<UserInterface[]>();

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refresh_observable_userGetList();
  }

  refresh_observable_userGetList(): void {
    this.loadingData = true;
    this.observable_user_getList = this.courseService.user_getList()
      .pipe(
        finalize(() => { this.loadingData = false; }),
      );

  }



  bnAgregarCurso_click(): void {

    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result: UserInterface) => {
      if (result) {
        this.loadingData = true;
        this.courseService.user_add(result)
          .subscribe(result => {
            if (result.isSuccess) {
              this.refresh_observable_userGetList();
            }
          });
      }
    });

  }


  bnEditar_onClick(course: UserInterface): void {

    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data: course,
    });

    dialogRef.afterClosed().subscribe((result: UserInterface) => {

      if (result) {
        this.loadingData = true;
        this.courseService.user_update(result)
          .subscribe(result => {
            if (result.isSuccess) {
              this.refresh_observable_userGetList();
            }
          });

      }
    });
  }

  bnEliminar_onClick(user: UserInterface): void {

    const data: FormModalYesNoInterface = {
      title: 'Una Pregunta',
      message: 'Está seguro que desea eliminar al usuario:<br/><br/>- Nombre completo: ' + user.fullName + '<br/>- Tipo de Usuario: ' + user.userType
    };

    const dialogRef = this.dialog.open(FormModalYesNoComponent, { data });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadingData = true;
        this.courseService.user_remove(user)
          .subscribe(result => {
            if (result.isSuccess) {
              this.refresh_observable_userGetList();
            }
          });
      }
    });

  }



}
