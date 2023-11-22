import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenerateUrl } from 'src/app/shared/utilCode/Code';
import { CourseService } from 'src/app/store/services/course.service';
import { MainApplication_UrlName } from '../../main-application.module';
import { Store } from '@ngrx/store';
import { CourseActions } from 'src/app/store/services/redux/CourseAction';
import { selectorCourseState } from 'src/app/store/services/redux/CourseSelector';
import { Subscription } from 'rxjs';


export const FormularioLoginComponent_UrlName: string = 'formulario-login';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.scss']
})
export class FormularioLoginComponent implements OnDestroy {
 

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private sb: FormBuilder,
    private router: Router
  ) {
      this.store.select(selectorCourseState).subscribe((state) => {

      if (state.operationResult.message) {
        this.openSnackBar(state.operationResult.message);
        if (state.operationResult.isSuccess) {
         this.bnCancelar_onClick()
        }
      }
    });
  }

  ngOnDestroy(): void {
    
  }


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

    this.store.dispatch(CourseActions.login({ email, password }));


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
