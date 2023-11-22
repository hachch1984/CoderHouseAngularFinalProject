import { createReducer, on } from "@ngrx/store";
import { OperationResultInterface } from "../../interfaces/OperationResult";
import { UserInterface } from "../../interfaces/UserInterface";
import { CourseActions } from "./CourseAction";


export const courseFeatureName = 'courseUserAuthorisation';

export interface CourseState {
    user?: UserInterface;
    operationResult: OperationResultInterface;
}

const initialState: CourseState = {
    user: undefined,
    operationResult: {
        isSuccess: false,
        message: '',
    }
}


export const courseReducer = createReducer(initialState,
    on(CourseActions.login, (state) => {
        return { ...state, user: undefined, operationResult: { isSuccess: false, message: '' } };
    }),
    on(CourseActions.loginSuccess, (state, action) => {
        return { ...state, user: action.user, operationResult: action.operationResult }
    }),
    on(CourseActions.loginError, (state, action) => {
        return { ...state, user: undefined, operationResult: action.operationResult };
    }),
    on(CourseActions.loginClear, (state) => {
        return { ...state, user: undefined, operationResult: { isSuccess: false, message: '' } };
    }),


    on(CourseActions.logout, (state) => {
        return { ...state, user: undefined, operationResult: { isSuccess: true, message: 'Usuario deslogeado correctamente' } };
    }),
);