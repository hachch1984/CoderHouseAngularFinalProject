import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, tap } from "rxjs";
import { GenerateUrl } from "src/app/shared/utilCode/Code";
import { UserTypeEnum } from "src/app/store/interfaces/UserTypeEnum";
import { selectorCourseState } from "src/app/store/services/redux/CourseSelector";
import { FormularioAccesoNoAutorizadoComponent_UrlName } from "../components/formulario-acceso-no-autorizado/formulario-acceso-no-autorizado.component";
import { MainApplication_UrlName } from "../main-application.module";


export const user_isLogged_guard: CanActivateFn = (route, segments) => {
    const store = inject(Store);
    const router = inject(Router);


    return store.select(selectorCourseState).pipe(
        map(value =>  value.user ? true : false),
        tap(result => {
            if (!result) {
                router.navigate([GenerateUrl(MainApplication_UrlName, FormularioAccesoNoAutorizadoComponent_UrlName)]);
            }
        })
    );

};



export const user_isAdministrador_guard: CanActivateFn = (route, segments) => {
    const store = inject(Store);
    const router = inject(Router);

    return store.select(selectorCourseState)
        .pipe(
            map(value =>  value.user && value.user.userType === UserTypeEnum.admin ? true : false),
            tap(result => {
                if (!result) {
                    router.navigate([GenerateUrl(MainApplication_UrlName, FormularioAccesoNoAutorizadoComponent_UrlName)]);
                }
            }),
        );

};

export const user_isEstudiante_guard: CanActivateFn = (route, segments) => {
   const store=inject(Store);
    const router = inject(Router);

    return store.select(selectorCourseState).pipe(
        map(value =>  value.user?.userType === UserTypeEnum.student ? true : false),
        tap(result => {
            if (!result) {
                router.navigate([GenerateUrl(MainApplication_UrlName, FormularioAccesoNoAutorizadoComponent_UrlName)]);
            }
        }),
    );

};

