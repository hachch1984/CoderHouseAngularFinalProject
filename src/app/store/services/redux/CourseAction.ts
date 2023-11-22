import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { OperationResultInterface } from "../../interfaces/OperationResult";
import { UserInterface } from "../../interfaces/UserInterface";

export const CourseActions=createActionGroup({
    source:'courseUserAuthorisation',
    events:{
        'Login':props<{email:string,password:string}>(),
        'Login Success':props<{user:UserInterface, operationResult:OperationResultInterface}>(),
        'Login Error':props<{operationResult:OperationResultInterface}>(),
        'Login Clear':emptyProps(),
        'Logout':emptyProps(),
    }
});