import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as CourseStateActions from './course-state.actions';

@Injectable()
export class CourseStateEffects {
  loadCourseStates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseStateActions.loadCourseState),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}
