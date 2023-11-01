import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { CourseService } from "src/app/store/services/course.service";

export const EmailExists_Validator = (courseService:CourseService ): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const email = control.value as string;
        const id = control.parent?.get('id')?.value as string; 
        return courseService.user_existsEmail(  id,email)
        .pipe(           
            map((exists: boolean) => (exists ? { emailExists: true,message:'El email ya existe' } : null))
        );
    };
};


  