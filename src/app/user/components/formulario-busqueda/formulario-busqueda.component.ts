import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { UserTypeEnum } from 'src/app/store/interfaces/UserTypeEnum';
import { CourseService } from 'src/app/store/services/course.service';

@Component({
  selector: 'app-formulario-busqueda',
  templateUrl: './formulario-busqueda.component.html',
  styleUrls: ['./formulario-busqueda.component.scss']
})
export class FormularioBusquedaComponent implements OnInit, OnDestroy {

  myForm = this.fb.group({
    fullName: ['', Validators.required, Validators.minLength(3)],
  });

  @Input()
  userType: UserTypeEnum | undefined = undefined;

  subject_debouncer = new Subject<string>();
  userList: UserInterface[] = [];
  userSelected: UserInterface | undefined = undefined;
  columnNames = ['index', 'fullName', 'picture'];
  clickedRows = new Set<UserInterface>();
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    public dialogRef: MatDialogRef<FormularioBusquedaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) { }

  ngOnInit(): void {
    this.subject_debouncer.pipe(
      debounceTime(1500),
      tap(() => {
        this.userSelected = undefined;
        this.userList = [];
      }),
      switchMap(valueString => this.courseService.user_getList_byFullName(valueString)),
    ).subscribe(result => this.userList = result);

  }

  ngOnDestroy(): void {
    this.subject_debouncer.unsubscribe();
  }

  isInvalid(): boolean {
    const control = this.myForm.get('fullName');
    return control && control.touched && control.invalid ? true : false;
  }

  errorMessage() {
    const control = this.myForm.get('fullName');
    if (control) {
      if (control.hasError('required')) {
        return 'El campo es requerido';
      }
      else if (control.hasError('minlength')) {
        return 'El campo debe tener al menos ' + control.getError('minlength').requiredLength + ' caracteres';
      }
    }
    return '';

  }

  input_onChange(event: Event): void {
    const control = event.currentTarget as HTMLInputElement;
    this.subject_debouncer.next(control.value);
  }

  bnAceptar_onClick(): void {
    this.dialogRef.close(this.userSelected);
   }
  bnCancelar_onClick(): void {
    this.dialogRef.close();
  }


  row_onClick(row: UserInterface): void {
    this.userSelected = row;
  }
  row_onDoubleClick(row: UserInterface): void {
    this.bnAceptar_onClick();
  }

}
