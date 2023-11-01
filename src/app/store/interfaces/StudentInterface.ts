import { CourseRoutingModule } from "src/app/course/course-routing.module";
import { UserInterface } from "./UserInterface";

//relacion entre usuario y curso
export interface StudentInterface {
    course_id:CourseRoutingModule,
    user_id:UserInterface,
}