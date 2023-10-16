import { AbstractControl, ValidationErrors } from "@angular/forms";
import { CourseType, CourseTypeList } from "../interfaces/CourseType";

export const CourseType_Validator = (control: AbstractControl): ValidationErrors | null => {



    const value = control.value as CourseType;
 

    if (CourseTypeList.findIndex((item) => item.id === value.id) === -1) {
        return { courseType: true, message: 'El tipo de curso no es valido' };
    }

    return null;

}