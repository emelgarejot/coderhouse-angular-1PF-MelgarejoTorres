import { createAction, props } from '@ngrx/store';
import { Course } from '../../../_models/course.type';

export const loadCourseState = createAction('[CourseState] Load CourseState');

export const loadedCourses = createAction(
  '[CourseState] Loaded Courses',
  props<{ courses: Course[] }>()
);

export const createCourseState = createAction(
  '[CourseState] Create  Course',
  props<{ course: Course }>()
);

export const updateCourseState = createAction(
  '[CourseState] Edit Course',
  props<{ course: Course }>()
);

export const deleteCourseState = createAction(
  '[CourseState] Delete Course',
  props<{ idCourse: number }>()
);
