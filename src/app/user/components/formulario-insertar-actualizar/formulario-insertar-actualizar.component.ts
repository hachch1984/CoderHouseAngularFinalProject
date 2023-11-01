import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { UserTypeEnum } from 'src/app/store/interfaces/UserTypeEnum';
import { CourseService } from 'src/app/store/services/course.service';
import { EmailExists_Validator } from '../../validators/EmailExists_Validator';

@Component({
  selector: 'user-formulario-insertar-actualizar',
  templateUrl: './formulario-insertar-actualizar.component.html',
  styleUrls: ['./formulario-insertar-actualizar.component.scss']
})
export class FormularioInsertarActualizarComponent implements OnInit {

  image_base64: string = '';
  userTypeList: UserTypeEnum[] = [];
  title: string = '';
  myForm = this.fb.group(
    {
      id: [''],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [EmailExists_Validator(this.courseService)]],
      userType: ['' as UserTypeEnum, Validators.required],
      password: ['', Validators.required],
      photoBase64: [''],
    }
  );


  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormularioInsertarActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInterface,) {

  }


  ngOnInit(): void {

    this.courseService.userType_getList().subscribe((userTypeList) => this.userTypeList = userTypeList);

    if (this.data === undefined) {
      this.title = 'Crear Usuario';
    } else {
      this.title = "Editar Usuario"
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
      else if (control.hasError('email')) {
        return 'Formato de email incorrecto';
      }
      else if (control.hasError('emailExists')) {
        return control.getError('message');
      }
    }
    return '';
  }


  bnAceptar_onClick(): void {

    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) return;

    let course = this.myForm.value as UserInterface;

    if (!course.id) {
      course.id = new Date().toString();
    }

    this.dialogRef.close(course);
  }

  bnCancelar_onClick(): void {
    this.dialogRef.close();
  }


  fileUpload_onChange(event: Event) {
    const control = event.currentTarget as HTMLInputElement;
    if (!control.files || control.files.length === 0) {
      return;
    }
    this.convertFile(control.files[0]).subscribe(base64 => {
      this.image_base64 = base64;
      this.myForm.get('photoBase64')?.setValue(base64);
    });
  }


  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      if (event && event.target && event.target.result) {
        result.next(btoa(event.target.result.toString()));
      }
    };
    return result;
  }


}
