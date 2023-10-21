import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseInterface } from '../../interfaces/CourseInterface';
import { CourseTypeInterface } from '../../interfaces/CourseTypeInterface';
import { CourseType_Validator } from '../../validators/CourseType_Validator';
import { CourseService } from '../../services/course.service';


@Component({
  templateUrl: './formulario-insertar-actualizar.component.html',
  styleUrls: ['./formulario-insertar-actualizar.component.scss'],
})
export class FormularioInsertarActualizarComponent implements OnInit {

  courseTypeList: CourseTypeInterface[] =this.courseService.getCourseTypeList();
  
  title: string = '';

  myForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    type: [{} as CourseTypeInterface, [Validators.required,CourseType_Validator(this.courseService)]],
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
      this.myForm.get('type')?.setValue( this.courseTypeList.find(x=>x.id===this.data.type.id)!);
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

