import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListComponent } from './course-list/course-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CourseEditComponent, CourseListComponent],
  imports: [CommonModule, CourseRoutingModule, SharedModule],
})
export class CourseModule {}
