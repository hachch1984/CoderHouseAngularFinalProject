import { Component, Inject, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseInterface } from '../../../store/interfaces/CourseInterface';
import { CourseTypeInterface } from '../../../store/interfaces/CourseTypeInterface';
import { CourseType_Validator } from '../../validators/CourseType_Validator';
import { CourseService } from '../../../store/services/course.service';


@Component({
  templateUrl: './formulario-insertar-actualizar.component.html',
  styleUrls: ['./formulario-insertar-actualizar.component.scss'],
})
export class FormularioInsertarActualizarComponent implements OnInit {


  observable_courseTypeList = this.courseService.courseType_getList();

  title: string = '';

  myForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    type: [{} as CourseTypeInterface, [Validators.required], [CourseType_Validator(this.courseService)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
  });


  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormularioInsertarActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseInterface,
  ) {


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


  bnAceptar_onClick(): void {

    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) return;

    let course = this.myForm.value as CourseInterface;

    if (!course.id) {
      course.id = new Date().toString();
    }

    this.dialogRef.close(course);
  }

  bnCancelar_onClick(): void {
    this.dialogRef.close();
  }
}

