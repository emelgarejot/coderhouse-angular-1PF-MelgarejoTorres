import { createAction, props } from '@ngrx/store';
import { Course } from '../../../_models/course.type';

export const loadCourseState = createAction('[CourseState] Load CourseState');

export const loadedCourses = createAction(
  '[CourseState] Loaded Courses',
  props<{ courses: Course[] }>()
);
