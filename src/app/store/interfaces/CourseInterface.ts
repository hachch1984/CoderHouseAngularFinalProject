import { CourseTypeInterface } from "./CourseTypeInterface";

export interface CourseInterface {
    id?: string,
    name: string,
    type: CourseTypeInterface,
    description: string,
}