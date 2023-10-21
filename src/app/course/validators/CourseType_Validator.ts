import { AbstractControl, ValidationErrors } from "@angular/forms";
import { CourseTypeInterface } from "../interfaces/CourseTypeInterface";
import { CourseService } from "../services/course.service";


export const CourseType_Validator = (courseService: CourseService) => (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as CourseTypeInterface;
    const courseTypeList = courseService.getCourseTypeList();

    if (courseTypeList.findIndex((item) => item.id === value.id) === -1) {
        return { courseType: true, message: 'El tipo de curso no es valido' };
    }

    return null;
}

 