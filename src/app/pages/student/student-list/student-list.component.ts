import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/_services/student.service';
import { MetaColumn } from '../../../_models/meta-column';
import { Student } from '../../../_models/student.type';
import { StudentEditComponent } from '../student-edit/student-edit.component';
import { filter, map, Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Session } from 'src/app/_models/session';
import { SessionService } from '../../../core/services/session.service';

const COLUMNS: MetaColumn[] = [
  {
    columnDef: 'id',
    header: 'Id',
  },
  {
    columnDef: 'name',
    header: 'Nombre',
  },
  {
    columnDef: 'lastName',
    header: 'Apellidos',
  },
  {
    columnDef: 'country',
    header: 'Pais',
  },
];

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit, OnDestroy {
  dataTable: Student[] = [];
  subscription?: Subscription;

  metaColumns = COLUMNS;

  searchForm: FormGroup;
  session$!: Observable<Session>;

  constructor(
    public dialog: MatDialog,
    private studenteService: StudentService,
    private sessionService: SessionService
  ) {
    this.searchForm = new FormGroup({
      filter: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.subscription = this.studenteService
      .getStudentListObservable()
      .subscribe((response) => {
        this.dataTable = [...response];
      });

    // Cargamos valor incial de la lista estudiantes

    this.studenteService.refreshListStudent();

    // Utilizamos operador map para eliminar espacio e blanco y transformarlo en mayuscula
    this.searchForm.controls['filter'].valueChanges
      .pipe(map((value: string) => value.trim().toUpperCase()))
      .subscribe((value) => {
        this.studenteService.filterStudents(value);
      });

    this.session$ = this.sessionService.getSession();
  }

  openModal(row?: Student) {
    this.dialog.open(StudentEditComponent, {
      data: row,
      width: '300px',
      disableClose: true,
    });
  }

  delete(row: Student) {
    let idDelete = row.id;
    this.studenteService
      .deleteStudent(idDelete)
      .subscribe((response) => this.studenteService.refreshListStudent());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
