import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, of, tap } from "rxjs";
import { GenerateUrl } from "src/app/shared/utilCode/Code";
import { UserTypeEnum } from "src/app/store/interfaces/UserTypeEnum";
import { CourseService } from "src/app/store/services/course.service";
import { MainApplication_UrlName } from "../main-application.module";
import { FormularioAccesoNoAutorizadoComponent_UrlName } from "../components/formulario-acceso-no-autorizado/formulario-acceso-no-autorizado.component";


export const user_isLogged_guard: CanActivateFn = (route, segments) => {
    const courseService: CourseService = inject(CourseService);
    const router = inject(Router);


    return of(courseService.user_logged()).pipe(
        map(obj =>  obj ? true : false),
        tap(result=>{
            if(!result){
                router.navigate([GenerateUrl(MainApplication_UrlName,FormularioAccesoNoAutorizadoComponent_UrlName)]);
            }
        })
    );

};



export const user_isAdministrador_guard: CanActivateFn = (route, segments) => {
    const courseService: CourseService = inject(CourseService);
    const router = inject(Router);

    return of(courseService.user_logged()).pipe(
        map(obj =>  obj && obj.userType === UserTypeEnum.admin ? true : false ),
        tap(result=>{
            if(!result){
                router.navigate([GenerateUrl(MainApplication_UrlName,FormularioAccesoNoAutorizadoComponent_UrlName)]);
            }
        }),
    );

};

export const user_isEstudiante_guard: CanActivateFn = (route, segments) => {
    const courseService: CourseService = inject(CourseService);
    const router = inject(Router);

    return of(courseService.user_logged()).pipe(
        map(obj =>  obj && obj.userType === UserTypeEnum.student ? true : false ),
        tap(result=>{
            if(!result){
                router.navigate([GenerateUrl(MainApplication_UrlName,FormularioAccesoNoAutorizadoComponent_UrlName)]);
            }
        }),
    );

};

