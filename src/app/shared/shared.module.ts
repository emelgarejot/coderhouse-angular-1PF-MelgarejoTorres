import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontSizeCustomDirective } from '../directives/font-size-custom.directive';

@NgModule({
  declarations: [TableComponent, FontSizeCustomDirective],
  imports: [CommonModule, MaterialModule],
  exports: [TableComponent, MaterialModule, ReactiveFormsModule],
})
export class SharedModule {}
