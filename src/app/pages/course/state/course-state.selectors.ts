import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourseState from './course-state.reducer';

export const selectCourseState =
  createFeatureSelector<fromCourseState.CourseState>(
    fromCourseState.courseStateFeatureKey
  );

export const selectLoadingCourses = createSelector(
  selectCourseState,
  (state: fromCourseState.CourseState) => state.loading
);

export const selectloadedCourses = createSelector(
  selectCourseState,
  (state: fromCourseState.CourseState) => state.courses
);
