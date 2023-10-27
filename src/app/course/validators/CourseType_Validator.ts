import { AbstractControl, ValidationErrors } from "@angular/forms";
import { CourseTypeInterface } from "../../store/interfaces/CourseTypeInterface";


export const CourseType_Validator = (courseTypeList:CourseTypeInterface[]) => (control: AbstractControl): ValidationErrors | null => {
   
    const value = control.value as CourseTypeInterface;
    if (value &&  courseTypeList.findIndex((item) => item.id === value.id) === -1) {
        return { courseType: true, message: 'El tipo de curso no es valido' };
    }
    return null;
   
}

