import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenerateUrl } from 'src/app/shared/utilCode/Code';
import { CourseService } from 'src/app/store/services/course.service';
import { MainApplication_UrlName } from '../../main-application.module';


export const FormularioLoginComponent_UrlName: string = 'formulario-login';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.scss']
})
export class FormularioLoginComponent {



  constructor(
    private snackBar: MatSnackBar,
    private sb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) { }


  myForm = this.sb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });



  isInvalid(controlName: string): boolean {
    let control = this.myForm.get(controlName);
    return control && control?.invalid && control?.touched ? true : false;
  }
  getErrorMessage(controlName: string): string {
    let control = this.myForm.get(controlName);
    if (control) {
      if (control.hasError('email')) {
        return 'Email formato incorrecto';
      } else if (control.hasError('required')) {
        return 'Campo requerido';
      }
    }
    return '';
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, { duration: 3 * 1000, data: true });
  }
  bnAceptar_onClick() {

    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) { return; }

    let email = this.myForm.value.email!;
    let password = this.myForm.value.password!;

    this.courseService.user_login(email, password).subscribe(
      (operationResult) => {
        this.openSnackBar(operationResult.message);
        if (operationResult.isSuccess) {
          this.bnCancelar_onClick();
        }
      }
    );
  }

  bnCancelar_onClick() {
    this.router.navigate([GenerateUrl(MainApplication_UrlName)]);
  }


  bnAsignar1_onClick() {
    this.myForm.patchValue({
      email: 'henry@email.com', password: '123'
    });
  }
  bnAsignar2_onClick() {
    this.myForm.patchValue({
      email: 'emily.davis@email.com', password: '123'
    });
  }
}
