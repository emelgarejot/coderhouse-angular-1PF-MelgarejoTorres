import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/_models/course.type';
import { CourseService } from 'src/app/_services/course.service';
import {
  createCourseState,
  updateCourseState,
} from '../state/course-state.actions';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  isEdit: boolean = true;
  editForm: FormGroup;
  title: string = '';
  categories$!: Observable<string[]>;
  constructor(
    private dialogRef: MatDialogRef<CourseEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private courseService: CourseService,
    private store: Store
  ) {
    this.editForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.minLength(2)),
      category: new FormControl(),
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.title = 'Editar Curso';
      this.editForm.controls['id'].setValue(this.data.id);
      this.editForm.controls['id'].disable();
      this.editForm.controls['name'].setValue(this.data.name);
      this.editForm.controls['category'].setValue(this.data.category);
    } else {
      this.isEdit = false;
      this.editForm.controls['id'].disable();
      this.title = 'Registrar Curso';
    }

    //Utilizamos Asyn para el select de Categorias
    this.categories$ = this.courseService.getCategories();
  }

  save() {
    if (this.isEdit) {
      this.store.dispatch(
        updateCourseState({ course: this.editForm.getRawValue() })
      );
    } else {
      this.store.dispatch(
        createCourseState({ course: this.editForm.getRawValue() })
      );
    }

    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
