import { createFeatureSelector } from "@ngrx/store";
import { CourseState, courseFeatureName } from "./CourseReducer";

export const selectorCourseState=createFeatureSelector<CourseState>(courseFeatureName);