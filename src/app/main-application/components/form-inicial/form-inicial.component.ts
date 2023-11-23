import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GenerateUrlName } from 'src/app/shared/utilCode/Code';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { selectorCourseState } from 'src/app/store/services/redux/CourseSelector';

export const FormInicialComponent_UrlName: string = GenerateUrlName('main-application-form-inicial');

@Component({
  templateUrl: './form-inicial.component.html',
  styleUrls: ['./form-inicial.component.scss']
})
export class FormInicialComponent implements OnDestroy {


  private user: UserInterface | undefined = undefined;
  private user_subscription = new Subscription();

  constructor(private store: Store) {
    this.user_subscription = store.select(selectorCourseState).subscribe((state) => this.user = state.user);
  }

  ngOnDestroy(): void {
    this.user_subscription.unsubscribe();
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
