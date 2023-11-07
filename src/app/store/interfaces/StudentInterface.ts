import { CourseInterface } from "./CourseInterface";
import { UserInterface } from "./UserInterface";

//relacion entre usuario y curso
export interface StudentInterface {
    id?: string,
    course_id: string,
    course: CourseInterface | undefined|null,
    user_id: string,
    user: UserInterface | undefined|null,
}