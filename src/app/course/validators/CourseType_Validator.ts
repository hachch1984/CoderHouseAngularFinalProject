import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { CourseService } from "src/app/store/services/course.service";
import { AreaInterface } from "../../store/interfaces/AreaInterface";


export const CourseType_Validator = (courseService: CourseService): AsyncValidatorFn => {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const value = control.value as AreaInterface;        
        return courseService.area_exists(value.id)
            .pipe(
                map((exists: boolean) => (exists === false ? { courseType: true, message: 'El tipo de curso no es valido' } : null))
            );
    }
}
