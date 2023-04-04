import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Course } from '../_models/course.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  url = `${environment.ENDPOINT}/courses`;
  private categories: string[] = [
    'Programación FrontEnd',
    'Programación BackEnd',
    'Base de Datos',
    'Agilidad',
    'Diseño',
  ];

  private courseListSubject: Subject<Course[]>;

  constructor(private http: HttpClient) {
    this.courseListSubject = new Subject<Course[]>();
  }

  refreshListCourse(): void {
    this.getListCourse().subscribe((response) => {
      this.courseListSubject.next(response);
    });
  }

  getCourseListObservable() {
    return this.courseListSubject.asObservable();
  }

  getCategories(): Observable<string[]> {
    return of(this.categories);
  }

  getListCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.url, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${course.id}`, course);
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.url}/${id}`);
  }

  filterCourses(criteria: string) {
    this.getListCourse().subscribe((courses) => {
      let copyCourseList = [...courses];

      let filteredCourseList: Course[] = copyCourseList.filter(
        (course) =>
          course.id.toString().includes(criteria) ||
          course.name.toUpperCase().includes(criteria) ||
          course.category.toUpperCase().includes(criteria)
      );

      this.courseListSubject.next(filteredCourseList);
    });
  }
}
