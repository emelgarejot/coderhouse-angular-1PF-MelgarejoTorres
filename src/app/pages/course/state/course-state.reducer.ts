import { Action, createReducer, on } from '@ngrx/store';
import * as CourseStateActions from './course-state.actions';
import { Course } from '../../../_models/course.type';

export const courseStateFeatureKey = 'courseState';

export interface CourseState {
  loading: boolean;
  courses: Course[];
}

export const initialState: CourseState = {
  loading: false,
  courses: [],
};

export const reducer = createReducer(
  initialState,

  on(CourseStateActions.loadCourseState, (state) => {
    const newState: CourseState = {
      loading: true,
      courses: state.courses,
    };
    return newState;
  }),

  on(CourseStateActions.loadedCourses, (state, { courses }) => {
    const newState: CourseState = {
      loading: false,
      courses: courses,
    };
    return newState;
  }),

  on(CourseStateActions.createCourseState, (state, { course }) => {
    return state;
  }),

  on(CourseStateActions.updateCourseState, (state, { course }) => {
    return state;
  }),

  on(CourseStateActions.deleteCourseState, (state, { idCourse }) => {
    return state;
  })
);
