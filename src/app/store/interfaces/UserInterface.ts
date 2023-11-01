import { UserTypeEnum } from "./UserTypeEnum";

export interface UserInterface{
    id:string;
    fullName: string;
    email: string;
    userType: UserTypeEnum,
    password:string,
    photoBase64?: string;
}