import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../../model/student.type';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    this.editForm = new FormGroup({
      id: new FormControl({ value: data.id, disabled: true }),
      name: new FormControl(data.name),
      lastName: new FormControl(data.lastName),
      country: new FormControl(data.country),
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  save() {}

  closeModal() {
    this.dialogRef.close();
  }
}
