import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageListComponent } from './view/page/page-list/page-list.component';
import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormComponent } from './view/component/form/form.component';

@NgModule({
  declarations: [PageListComponent, FormComponent],
  imports: [CommonModule, StudentRoutingModule, SharedModule],
})
export class StudentModule {}
