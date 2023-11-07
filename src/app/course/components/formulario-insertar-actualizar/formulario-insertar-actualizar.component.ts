import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseInterface } from '../../../store/interfaces/CourseInterface';
import { AreaInterface } from '../../../store/interfaces/AreaInterface';
import { CourseService } from '../../../store/services/course.service';
import { CourseType_Validator } from '../../validators/CourseType_Validator';
import { tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from 'src/app/shared/componets/snackbar-error/snackbar-error.component';
import { OperationResultInterface } from 'src/app/store/interfaces/OperationResult';


@Component({
  templateUrl: './formulario-insertar-actualizar.component.html',
  styleUrls: ['./formulario-insertar-actualizar.component.scss'],
})
export class FormularioInsertarActualizarComponent implements OnInit {



  observable_areaList = this.courseService.area_getList();

  title: string = '';

  myForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    area: [{} as AreaInterface, [Validators.required], [CourseType_Validator(this.courseService)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
  });


  constructor(
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormularioInsertarActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseInterface,
  ) {


  }

  openSnackBar(message: string) {
    
    this.snackBar.open(message, undefined, { duration: 3 * 1000, data: true });
  }


  ngOnInit(): void {


    if (!this.data) {
      this.title = 'Crear Curso';
    }
    else {
      this.title = 'Editar Curso';
      this.myForm.patchValue(this.data);
    }
  }



  isInvalid(controlName: string): boolean {
    const control = this.myForm.get(controlName);

    return (control && control.touched && control.invalid) ? true : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.myForm.get(controlName);
    if (control && control.touched && control.invalid) {

      if (control.hasError('required')) {
        return 'Este campo es requerido';
      }
      else if (control.hasError('minlength')) {
        return 'Este campo debe tener al menos ' + control.getError('minlength').requiredLength + ' caracteres';
      }
      else if (control.hasError('maximunlength')) {
        return 'Este campo debe tener como máximo ' + control.getError('maximunlength').requiredLength + ' caracteres';
      } else if (control.hasError('courseType')) {
        return control.getError('message');
      }
    }
    return '';
  }



  resultAction(result: OperationResultInterface): void {
    this.openSnackBar(result.message);

    if (result.isSuccess) {
      this.dialogRef.close(true)
    }
  }

  bnAceptar_onClick(): void {

    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) {return;}

    let course = this.myForm.value as CourseInterface;

    if (!course.id) {
      this.courseService
        .course_add(course)
        .subscribe(result => this.resultAction(result));
    } else {
      this.courseService
        .course_update(course)
        .subscribe(result => this.resultAction(result));
    }
 
  }

  bnCancelar_onClick(): void {
    this.dialogRef.close();
  }
}

