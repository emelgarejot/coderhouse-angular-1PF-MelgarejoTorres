import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Course } from '../_models/course.type';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courseList: Course[] = [
    { id: 1, name: 'Java Script', category: 'Programación FrontEnd' },
    { id: 2, name: 'Angular', category: 'Programación FrontEnd' },
    { id: 3, name: 'Java', category: 'Programación BackEnd' },
    { id: 4, name: 'SQL', category: 'Base de Datos' },
    { id: 5, name: 'SCRUM', category: 'Agilidad' },
    { id: 6, name: 'Design Thinking', category: 'Agilidad' },
  ];

  private categories: string[] = [
    'Programación FrontEnd',
    'Programación BackEnd',
    'Base de Datos',
    'Agilidad',
    'Diseño',
  ];

  private courseListSubject: BehaviorSubject<Course[]>;

  constructor() {
    this.courseListSubject = new BehaviorSubject(this.courseList);
  }

  getCourseList() {
    return this.courseListSubject.asObservable();
  }

  getCategories(): Observable<string[]> {
    return of(this.categories);
  }

  deleteCourse(id: number) {
    let index = this.courseList.findIndex((s) => s.id == id);

    if (index >= 0) {
      this.courseList.splice(index, 1);
      this.notifyChangeStudentList();
    }
  }

  addStudent(course: Course) {
    this.courseList.push(course);
    this.notifyChangeStudentList();
  }

  filterCourses(criteria: string) {
    let copyCourseList = [...this.courseList];

    let filteredCourseList: Course[] = copyCourseList.filter(
      (course) =>
        course.id.toString().includes(criteria) ||
        course.name.toUpperCase().includes(criteria) ||
        course.category.toUpperCase().includes(criteria)
    );

    this.courseListSubject.next(filteredCourseList);
  }

  updateStudent(course: Course) {
    let courseUpdate = this.courseList.find((s) => s.id == course.id);

    if (courseUpdate) {
      courseUpdate.name = course.name;
      courseUpdate.category = course.category;

      this.notifyChangeStudentList();
    }
  }
  private notifyChangeStudentList() {
    this.courseListSubject.next(this.courseList);
  }
}
