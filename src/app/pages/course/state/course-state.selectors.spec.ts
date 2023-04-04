import * as fromCourseState from './course-state.reducer';
import { selectCourseState } from './course-state.selectors';

describe('CourseState Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCourseState({
      [fromCourseState.courseStateFeatureKey]: {},
    });

    //expect(result).toEqual({});
  });
});
