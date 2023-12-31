import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, finalize, startWith } from 'rxjs';
import { FormModalYesNoComponent, FormModalYesNoInterface } from 'src/app/shared/componets/form-modal-yes-no/form-modal-yes-no.component';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { CourseService } from 'src/app/store/services/course.service';
import { FormularioInsertarActualizarComponent, FormularioInsertarActualizarComponent_Data } from '../formulario-insertar-actualizar/formulario-insertar-actualizar.component';
import { GenerateUrlName } from 'src/app/shared/utilCode/Code';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationResultInterface } from 'src/app/store/interfaces/OperationResult';


export const User_ListadoGeneralComponent_UrlName =GenerateUrlName( 'listado-general');

@Component({ 
  templateUrl: './listado-general.component.html',
  styleUrls: ['./listado-general.component.scss']
})
export class ListadoGeneralComponent implements OnInit {

  columnNames = ['index', 'fullName', 'userType', 'picture', 'actions',];
  loadingData = true;
  observable_user_getList = new Observable<UserInterface[]>();

  constructor(
    private snackBar: MatSnackBar,
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
    const data: FormularioInsertarActualizarComponent_Data = {
      user:undefined,
      readOnly:false,
    };
    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data 
    });

    dialogRef.afterClosed().subscribe( ()=>this.refresh_observable_userGetList());

  }


  bnEditar_onClick(user: UserInterface): void {

    const data: FormularioInsertarActualizarComponent_Data = {
      user:user,
      readOnly:false,
    };
    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data ,
    });

    dialogRef.afterClosed().subscribe( ()=>this.refresh_observable_userGetList());
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
            this.snackBar.open(result.message, undefined, { duration: 3 * 1000, data: true });             
              this.refresh_observable_userGetList();
            
          });
      }
    });

  }



}
