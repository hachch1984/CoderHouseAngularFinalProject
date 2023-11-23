import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './form-modal-yes-no.component.html',
  styleUrls: ['./form-modal-yes-no.component.scss']
})
export class FormModalYesNoComponent implements OnInit{


  constructor(
    public dialogRef: MatDialogRef<FormModalYesNoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormModalYesNoInterface,
  ) { 
  }

  ngOnInit(): void { 
  }

  bnAceptar_onClick(): void {
    this.dialogRef.close(true);
  }

  bnCancelar_onClick(): void {
    this.dialogRef.close(false);
  }

}



export interface FormModalYesNoInterface {
  title: string,
  message: string,
}