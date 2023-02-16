import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Student } from '../../../_models/student.type';
import { StudentService } from '../../../_services/student.service';

@Component({
  selector: 'app-form',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent implements OnInit {
  isEdit: boolean = true;
  editForm: FormGroup;
  title: string = '';
  countries$!: Observable<string[]>;
  constructor(
    private dialogRef: MatDialogRef<StudentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private studenteService: StudentService
  ) {
    this.editForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      lastName: new FormControl(),
      country: new FormControl(),
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.title = 'Editar Alumno';
      this.editForm.controls['id'].setValue(this.data.id);
      this.editForm.controls['id'].disable();
      this.editForm.controls['name'].setValue(this.data.name);
      this.editForm.controls['lastName'].setValue(this.data.lastName);
      this.editForm.controls['country'].setValue(this.data.country);
    } else {
      this.isEdit = false;
      this.title = 'Registrar Alumno';
    }

    //Utilizamos Asyn para el select de Paises
    this.countries$ = this.studenteService.getCountries();
  }

  save() {
    if (this.isEdit) {
      this.studenteService.updateStudent(this.editForm.getRawValue());
    } else {
      this.studenteService.addStudent(this.editForm.getRawValue());
    }

    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
