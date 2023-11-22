import { ActionReducerMap } from "@ngrx/store";
import { CourseState, courseFeatureName, courseReducer } from "./CourseReducer";

export const appReducer: ActionReducerMap<{ [courseFeatureName]: CourseState }> = {
    [courseFeatureName]: courseReducer,  
};