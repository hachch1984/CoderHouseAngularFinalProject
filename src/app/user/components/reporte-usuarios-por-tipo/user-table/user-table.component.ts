import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { FormularioInsertarActualizarComponent, FormularioInsertarActualizarComponent_Data } from '../../formulario-insertar-actualizar/formulario-insertar-actualizar.component';

@Component({
  selector: 'user-reporteUsuarioPorTipo-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {

  @Input()
  title = '';
  @Input()
  usersList: UserInterface[] = [];
  columnNames = ['index', 'fullName', 'picture', 'actions'];


  constructor(private dialog: MatDialog) { }

  bnVerDetalles_onClick(user: UserInterface): void {

    const data: FormularioInsertarActualizarComponent_Data = {
      user:user,
      readOnly:true,
    };
    const dialogRef = this.dialog.open(FormularioInsertarActualizarComponent, {
      data ,
    });

    dialogRef.afterClosed().subscribe();



  }

}
