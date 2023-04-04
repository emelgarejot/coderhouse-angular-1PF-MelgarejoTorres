import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CourseStateEffects } from './course-state.effects';

describe('CourseStateEffects', () => {
  let actions$: Observable<any>;
  let effects: CourseStateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseStateEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CourseStateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
