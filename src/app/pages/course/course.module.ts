import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListComponent } from './course-list/course-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
//import { CourseStateEffects } from './state/course-state.effects';
import { courseStateFeatureKey, reducer } from './state/course-state.reducer';

@NgModule({
  declarations: [CourseEditComponent, CourseListComponent],
  // imports: [CommonModule, CourseRoutingModule, SharedModule, EffectsModule.forFeature([CourseStateEffects])],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    StoreModule.forFeature(courseStateFeatureKey, reducer),
  ],
})
export class CourseModule {}
