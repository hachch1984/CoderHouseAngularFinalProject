import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UserInterface } from '../../interfaces/UserInterface';
import { CourseActions } from './CourseAction';


@Injectable()
export class CourseEffect {

    private baseUrl = 'http://localhost:3000';

    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.login),
        exhaustMap(parameters => this.http.get<UserInterface[]>(`${this.baseUrl}/users?email=${parameters.email}&password=${parameters.password}`)
            .pipe(
                map(result => {
                    if (result.length === 1) {
                        return CourseActions.loginSuccess({ user: result[0], operationResult: { isSuccess: true, message: 'Usuario logeado correctamente' } });
                    } else {
                        return CourseActions.loginError({ operationResult: { isSuccess: false, message: 'Usuario y/o password incorrecto' } });
                    }
                }),
                catchError(() => of(CourseActions.loginError({ operationResult: { isSuccess: false, message: 'Error al intentar logearse' } })))
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) { }

}

