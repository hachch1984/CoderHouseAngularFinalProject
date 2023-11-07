import { AreaInterface } from "./AreaInterface";

export interface CourseInterface {
    id?: string,
    name: string,
    area_id:string,
    area: AreaInterface|undefined|null,
    description: string,
}