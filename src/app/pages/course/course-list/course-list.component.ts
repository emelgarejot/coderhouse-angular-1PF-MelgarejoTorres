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
import { Store } from '@ngrx/store';
import {
  selectLoadingCourses,
  selectloadedCourses,
} from '../state/course-state.selectors';
import {
  deleteCourseState,
  loadCourseState,
  loadedCourses,
} from '../state/course-state.actions';

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
  loading$!: Observable<boolean>;

  session$!: Observable<Session>;

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
    private sessionService: SessionService,
    private store: Store
  ) {
    this.searchForm = new FormGroup({
      filter: new FormControl(''),
    });
  }

  ngOnInit(): void {
    /*
    this.subscription = this.courseService
      .getCourseListObservable()
      .subscribe((response) => {
        this.dataTable = [...response];
      });

    // Cargamos valor inicial de la lista estudiantes

    this.courseService.refreshListCourse();

    */

    this.loading$ = this.store.select(selectLoadingCourses);
    this.store.dispatch(loadCourseState());

    this.store.select(selectloadedCourses).subscribe((courses) => {
      this.dataTable = [...courses];
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
    this.store.dispatch(deleteCourseState({ idCourse: idDelete }));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
