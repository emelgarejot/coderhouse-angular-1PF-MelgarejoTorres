import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_models/course.type';
import { MetaColumn } from 'src/app/_models/meta-column';
import { map, Subscription, Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/_services/course.service';
import { CourseEditComponent } from '../course-edit/course-edit.component';
import { SessionService } from '../../../core/services/session.service';
import { Session } from '../../../_models/session';

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
    columnDef: 'category',
    header: 'Categoria',
  },
];

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  dataTable: Course[] = [];
  subscription?: Subscription;
  metaColumns = COLUMNS;
  searchForm: FormGroup;

  session$!: Observable<Session>;

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
    private sessionService: SessionService
  ) {
    this.searchForm = new FormGroup({
      filter: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.subscription = this.courseService
      .getCourseList()
      .subscribe((response) => {
        this.dataTable = [...response];
      });

    // Utilizamos operador map para eliminar espacio e blanco y transformarlo en mayuscula
    this.searchForm.controls['filter'].valueChanges
      .pipe(map((value: string) => value.trim().toUpperCase()))
      .subscribe((value) => {
        this.courseService.filterCourses(value);
      });

    this.session$ = this.sessionService.getSession();
  }

  openModal(row?: Course) {
    this.dialog.open(CourseEditComponent, {
      data: row,
      width: '300px',
      disableClose: true,
    });
  }

  delete(row: Course) {
    let idDelete = row.id;
    this.courseService.deleteCourse(idDelete);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
