import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import * as CourseStateActions from './course-state.actions';
import { CourseService } from '../../../_services/course.service';
import { Course } from 'src/app/_models/course.type';

@Injectable()
export class CourseEffects {
  constructor(
    private courseService: CourseService,
    private actions$: Actions
  ) {}

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseStateActions.loadCourseState),
      concatMap(() => {
        return this.courseService
          .getListCourse()
          .pipe(
            map((courses) =>
              CourseStateActions.loadedCourses({ courses: courses })
            )
          );
      })
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseStateActions.createCourseState),
      concatMap(({ course }) => {
        return this.courseService
          .addCourse(course)
          .pipe(map((courseCreated) => CourseStateActions.loadCourseState()));
      })
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseStateActions.updateCourseState),
      concatMap(({ course }) => {
        return this.courseService
          .updateCourse(course)
          .pipe(map((courseUpdated) => CourseStateActions.loadCourseState()));
      })
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseStateActions.deleteCourseState),
      concatMap(({ idCourse }) => {
        return this.courseService
          .deleteCourse(idCourse)
          .pipe(map((courseDeleted) => CourseStateActions.loadCourseState()));
      })
    );
  });
}
