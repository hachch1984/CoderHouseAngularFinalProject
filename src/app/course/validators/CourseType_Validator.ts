import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { CourseService } from "src/app/store/services/course.service";
import { CourseTypeInterface } from "../../store/interfaces/CourseTypeInterface";


export const CourseType_Validator = (courseService: CourseService): AsyncValidatorFn => {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const value = control.value as CourseTypeInterface;        
        return courseService.courseType_exists(value.id)
            .pipe(
                map((exists: boolean) => (exists === false ? { courseType: true, message: 'El tipo de curso no es valido' } : null))
            );
    }
}
