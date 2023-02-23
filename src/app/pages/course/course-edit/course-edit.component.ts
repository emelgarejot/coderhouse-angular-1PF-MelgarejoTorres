import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Course } from 'src/app/_models/course.type';
import { CourseService } from 'src/app/_services/course.service';

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
    private courseService: CourseService
  ) {
    this.editForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
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
      this.title = 'Registrar Curso';
    }

    //Utilizamos Asyn para el select de Categorias
    this.categories$ = this.courseService.getCategories();
  }

  save() {
    if (this.isEdit) {
      this.courseService.updateStudent(this.editForm.getRawValue());
    } else {
      this.courseService.addStudent(this.editForm.getRawValue());
    }

    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
