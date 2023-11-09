import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { UserTypeEnum } from 'src/app/store/interfaces/UserTypeEnum';
import { CourseService } from 'src/app/store/services/course.service';
import { EmailExists_Validator } from '../../validators/EmailExists_Validator';
import { OperationResultInterface } from 'src/app/store/interfaces/OperationResult';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface FormularioInsertarActualizarComponent_Data {
  user: UserInterface | undefined,
  readOnly: boolean,
}

@Component({ 
  templateUrl: './formulario-insertar-actualizar.component.html',
  styleUrls: ['./formulario-insertar-actualizar.component.scss']
})
export class FormularioInsertarActualizarComponent implements OnInit {

  image_base64: string |undefined;
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
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormularioInsertarActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormularioInsertarActualizarComponent_Data,) {

  }


  ngOnInit(): void {

    this.courseService.userType_getList().subscribe((userTypeList) => this.userTypeList = userTypeList);

    if (this.data.user === undefined) {
      this.title = 'Crear Usuario';
    } else {
      this.title = "Editar Usuario"
      this.myForm.patchValue(this.data.user);
      this.image_base64 = this.data.user.photoBase64;
    }
    if (this.data.readOnly) {
      this.title = "Detalles del usuario";
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


  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, { duration: 3 * 1000, data: true });
  }
  

  resultAction(result: OperationResultInterface): void {
    this.openSnackBar(result.message);

    if (result.isSuccess) {
      this.dialogRef.close(true)
    }
  }

  bnAceptar_onClick(): void {

    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) return;

    let user = this.myForm.value as UserInterface;

    if (!user.id) {
      this.courseService.user_add(user).subscribe((result) => {
        this.resultAction(result);
      })
    }else{
      this.courseService.user_update(user).subscribe((result) => {
        this.resultAction(result);
      })
    }
 
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

  getPhotoBase64():string|null|undefined  {
   return this.myForm.get('photoBase64')?.value;
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
