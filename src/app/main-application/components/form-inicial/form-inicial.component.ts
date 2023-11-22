import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GenerateUrlName } from 'src/app/shared/utilCode/Code';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { selectorCourseState } from 'src/app/store/services/redux/CourseSelector';

export const FormInicialComponent_UrlName: string = GenerateUrlName('main-application-form-inicial');

@Component({
  templateUrl: './form-inicial.component.html',
  styleUrls: ['./form-inicial.component.scss']
})
export class FormInicialComponent {


  private user: UserInterface | undefined = undefined;

  constructor(private store: Store) {

    store.select(selectorCourseState).subscribe((state) => this.user = state.user);

  }



  getTextobienvendia() {
    let text = '';
    if (this.user) {
      text = `Bienvenido estudiante: ${this.user.fullName}`;
    } else {
      text = 'Bienvenido usuario desconocido, por favor inicie sesion';
    }
    return text;
  }


}
