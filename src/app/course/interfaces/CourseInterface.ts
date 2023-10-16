import { CourseType } from "./CourseType";

export interface CourseInterface {
    id?: string,
    name: string,
    type: CourseType,
    description: string,
}